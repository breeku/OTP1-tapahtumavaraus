/** Express router
 * @module routers/events
 * @requires express
 */

const express = require('express')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const db = require('../database/models')
const { BASEURL } = require('../config/index')

/**
 * Mount express router
 * @type {object}
 * @const
 * @namespace eventsRouter
 */
const eventsRouter = express.Router()

const JWTKEY = process.env.JWTKEY

/**
 * Varausten tekeminen
 * @name get/reservation/:id/:count
 * @function
 * @memberof module:routers/events~eventsRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
eventsRouter.get('/reservation/:id/:count', async (req, res) => {
    const token = req.headers.authorization
    const event_id = req.params.id
    const count = req.params.count
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            try {
                const { account_id } = jwt.verify(token, JWTKEY)
                await db.Reservation.create({ event_id, account_id })
            } catch (e) {
                console.warn(e)
                return res.sendStatus(500)
            }
        }
    } else {
        res.sendStatus(500)
    }
    res.sendStatus(200)
})

/**
 * Arvostelun luominen
 * @name post/review/:id
 * @function
 * @memberof module:routers/events~eventsRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

eventsRouter.post('/review/:id/', async (req, res) => {
    const token = req.headers.authorization
    const event_id = req.params.id
    const review = req.body
    try {
        const { account_id } = jwt.verify(token, JWTKEY)
        const found = await db.Review.findOne({ where: { event_id, account_id } })
        if (!found) {
            await db.Review.create({ account_id, event_id, ...review })
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } catch (e) {
        res.sendStatus(500)
        console.warn(e)
    }
})

/**
 * Arvostelun poistaminen
 * @name delete/review/:id/delete
 * @function
 * @memberof module:routers/events~eventsRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

eventsRouter.delete('/review/:id/delete', async (req, res) => {
    const token = req.headers.authorization
    const event_id = req.params.id
    try {
        const { account_id } = jwt.verify(token, JWTKEY)
        const found = await db.Review.findOne({ where: { event_id, account_id } })
        if (found) {
            await found.destroy()
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } catch (e) {
        res.sendStatus(500)
        console.warn(e)
    }
})

/**
 * Arvostelun päivitys
 * @name post/review/:id/update
 * @function
 * @memberof module:routers/events~eventsRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

eventsRouter.post('/review/:id/update', async (req, res) => {
    const token = req.headers.authorization
    const event_id = req.params.id
    const review = req.body
    if (!review.rating || !review.header || !review.content) return res.sendStatus(500)
    try {
        const { account_id } = jwt.verify(token, JWTKEY)
        const found = await db.Review.findOne({ where: { event_id, account_id } })
        if (found) {
            found.update({ ...review })
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        res.sendStatus(500)
        console.warn(e)
    }
})

/**
 * Tapahtuman hakeminen event idn perusteella
 * @name get/:id/fetch
 * @function
 * @memberof module:routers/events~eventsRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

eventsRouter.get('/:id/:fetch', async (req, res) => {
    const id = req.params.id
    const fetch = req.params.fetch
    let response = {}

    try {
        const dbEvent = await db.Event.findOne({
            where: { event_id: id },
            include: [
                {
                    model: db.Reservation,
                    required: false,
                    include: {
                        model: db.User,
                        attributes: ['username'],
                    },
                },
                {
                    model: db.Review,
                    required: false,
                    include: {
                        model: db.User,
                        attributes: ['username'],
                    },
                },
            ],
        })

        if (fetch || !dbEvent) {
            const event = await axios.get(BASEURL + 'v1/event/' + id)
            if (!dbEvent) {
                await db.Event.create({ event_id: event.data.id })
            }
            response = { Event: event.data }
        }

        if (dbEvent) {
            if (dbEvent.Reviews) response = { ...response, Reviews: dbEvent.Reviews }
            if (dbEvent.Reservations)
                response = { ...response, Reservations: dbEvent.Reservations }
        }
        res.send(response)
    } catch (e) {
        console.warn(e)
    }
})

/**
 * Tapahtumien hakeminen tagin perusteella
 * @name get/:lang/:limit/:tags
 * @function
 * @memberof module:routers/events~eventsRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

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

module.exports = eventsRouter
