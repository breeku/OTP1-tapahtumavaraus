const express = require('express')
const axios = require('axios')
const BASEURL = require('../config/index')
const db = require('../database/models')

const eventsRouter = express.Router()

eventsRouter.get('/:lang/:limit/:tags', async (req, res) => {
    const language = req.params.lang
    const limit = req.params.limit
    const tags = req.params.tags

    try {
        console.log(language, limit, tags)
        const response = await axios.get(
            BASEURL +
                'v1/events/' +
                '?tags_search=' +
                tags +
                '&language_filter=' +
                language +
                '&limit=' +
                limit,
        )
        res.send(response.data)
    } catch (e) {
        console.log(e)
    }
})

eventsRouter.get('/:id/:fetch', async (req, res) => {
    const id = req.params.id
    const fetch = req.params.fetch
    let response = {}

    const dbEvent = await db.Event.findOne({
        where: { event_id: id },
        include: [
            { model: db.Reservation, required: false },
            {
                model: db.Review,
                required: false,
                include: { model: db.User, attributes: ['name'] },
            },
        ],
    })

    if (fetch || !dbEvent) {
        const event = await axios.get(BASEURL + 'v1/event/' + id)
        if (!dbEvent) {
            // laita event tietokantaan
        }
        response = { Event: event.data }
    }

    if (dbEvent) {
        if (dbEvent.Reviews) response = { ...response, Reviews: dbEvent.Reviews }
        if (dbEvent.Reservations)
            response = { ...response, Reservations: dbEvent.Reservations }
    }

    res.send(response)
})

module.exports = eventsRouter
