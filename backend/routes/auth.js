const express = require('express')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const db = require('../database/models/index')
const SALTROUNDS = require('../config/index')

const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
    const credentials = req.body
    console.log(credentials)
    if (credentials.email && credentials.password) {
        try {
            const user = await db.User.findOne({
                where: {
                    email: credentials.email,
                },
                raw: true,
            })
            console.log(user)
            const match = await bcrypt.compare(credentials.password, user.password)
            if (match) {
                console.log('match!')
                res.send(true)
            } else {
                console.log('incorrect credentials')
                res.send(false)
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
    console.log(credentials)
    try {
        const created = await db.User.create(credentials)
        if (created) {
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (e) {
        console.warn(e)
    }
})

module.exports = authRouter
