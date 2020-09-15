const express = require('express')
const axios = require('axios')
const BASEURL = require('../config/index')

const eventsRouter = express.Router()

eventsRouter.get('/:lang/:limit', async (req, res) => {
    const language = req.params.lang
    const limit = req.params.limit
    try {
    
        const response = await axios.get(BASEURL + 'v1/events/' + '?limit=' + limit + "&language_filter=" + language)
        res.send(response.data)
    } catch (e) {
        console.log(e)
    }
})

eventsRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = eventsRouter
