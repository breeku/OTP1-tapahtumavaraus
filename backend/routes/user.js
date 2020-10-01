const express = require('express')
const db = require('../database/models/index')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()
const JWTKEY = process.env.JWTKEY

userRouter.get('/', async (req, res) => {
    const token = req.headers.authorization
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
                    include: { model: db.Event, required: false },
                },
                {
                    model: db.Review,
                    required: false,
                    include: { model: db.Event, required: false },
                },
            ],
        })
        res.status(200).send(user)
    } catch (e) {
        res.sendStatus(500)
        console.warn(e)
    }
})

module.exports = userRouter
