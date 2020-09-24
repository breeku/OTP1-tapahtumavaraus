const axios = require('axios')
const BASEURL = require('../config/index')
const db = require('../database/models/index')
;(async () => {
    const events = await axios.get(BASEURL + 'v1/events/')

    // tagit
    for (const [key, value] of Object.entries(events.data.tags)) {
        const found = await db.Tag.findOne({
            where: {
                uuid: key,
            },
            raw: true,
        })

        if (!found) {
            await db.Tag.create({ uuid: key, name: value })
        }
    }

    // eventit
    for (const event of events.data.data) {
        const found = await db.Event.findOne({
            where: {
                event_id: event.id,
            },
            raw: true,
        })
        if (!found) {
            await db.Event.create({ event_id: event.id })
        }
    }
})()
