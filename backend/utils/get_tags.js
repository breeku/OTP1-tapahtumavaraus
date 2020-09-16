const axios = require('axios')
const BASEURL = require('../config/index')
const db = require('../database/models/index')
;(async () => {
    const events = await axios.get(BASEURL + 'v1/events/')
    const activities = await axios.get(BASEURL + 'v1/events/')
    const places = await axios.get(BASEURL + 'v1/places/')
    const allTags = { ...events.data.tags, ...activities.data.tags, ...places.data.tags }

    for (const [key, value] of Object.entries(allTags)) {
        console.log(`${key}: ${value}`)
        const found = await db.Tags.findOne({
            where: {
                uuid: key,
            },
            raw: true,
        })

        if (!found) {
            await db.Tags.create({ uuid: key, name: value })
        }
    }

    const dbTags = await db.Tags.findAll({ raw: true })
    console.log(dbTags)
})()
