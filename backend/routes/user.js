const express = require('express')
const db = require('../database/models/index')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { BASEURL } = require('../config/index')

const userRouter = express.Router()
const JWTKEY = process.env.JWTKEY

/**
 * Route käyttäjätietojen hakemiselle
 * 
 * @component
 * @category Käyttäjätiedot
 */

userRouter.get('/', async (req, res) => {
    const token = req.headers.authorization
    let response = { Reservations: [], Reviews: [], User: {} }
    try {
        const { account_id } = jwt.verify(token, JWTKEY)
        const user = await db.User.findOne({
            where: {
                account_id,
            },
            include: [
                {
                    model: db.Reservation,
                    required: false,
                },
                {
                    model: db.Review,
                    required: false,
                },
            ],
        })
        const event_ids = [
            ...new Set(
                user.Reservations.map(x => x.event_id).concat(
                    user.Reviews.map(x => x.event_id),
                ),
            ),
        ]
        for (const event_id of event_ids) {
            try {
                const { data: event } = await axios.get(BASEURL + 'v1/event/' + event_id)
                const review = user.Reviews.find(x => x.event_id === event_id)
                const reservation = user.Reservations.find(x => x.event_id === event_id)
                if (review) {
                    response.Reviews.push({
                        Review: review.get({ plain: true }),
                        Event: event,
                    })
                }
                if (reservation) {
                    response.Reservations.push({
                        Reservation: reservation.get({ plain: true }),
                        Event: event,
                    })
                }
            } catch (e) {
                console.warn('Tapahtumaa ei enää löytynyt') // poista tai näytä että tapahtuma on poistettu
            }
        }
        // eslint-disable-next-line no-unused-vars
        const { Reservations, Reviews, ...rest } = user.get({ plain: true })
        response.User = rest
        res.status(200).send(response)
    } catch (e) {
        res.sendStatus(500)
        console.warn(e)
    }
})

module.exports = userRouter
