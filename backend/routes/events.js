const express = require('express')
const axios = require('axios')
const BASEURL = require('../config/index')

const eventsRouter = express.Router()

eventsRouter.get('/:lang/:limit/:tags', async (req, res) => {
    const language = req.params.lang
    const limit = req.params.limit
    const tags = req.params.tags

    console.log(tags)

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

eventsRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = eventsRouter
