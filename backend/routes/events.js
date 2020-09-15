const express = require('express')
const axios = require('axios')
const BASEURL = require('../config/index')

const eventsRouter = express.Router()

eventsRouter.get('/', async (req, res) => {
    try {
        const limit = 10
        const response = await axios.get(BASEURL + 'v1/events/' + '?limit=' + limit)
        res.send(response.data)
    } catch (e) {
        console.error(e)
    }
})

eventsRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = eventsRouter
