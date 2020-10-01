const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database/models/index')

const JWTKEY = process.env.JWTKEY
const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
    const credentials = req.body
    if (credentials.email && credentials.password) {
        try {
            const { password, ...user } = await db.User.scope('withPassword').findOne({
                where: {
                    email: credentials.email,
                },
                raw: true,
            })
            const match = await bcrypt.compare(credentials.password, password)
            if (match) {
                const token = jwt.sign({ ...user }, JWTKEY)
                console.log({ token })
                res.status(200).send({ token })
            } else {
                res.sendStatus(401)
            }
        } catch (e) {
            console.warn(e)
        }
    } else {
        res.send(false)
    }
})

authRouter.post('/register', async (req, res) => {
    const credentials = req.body
    try {
        const created = await db.User.create(credentials)
        if (created) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } catch (e) {
        console.warn(e)
    }
})

module.exports = authRouter
