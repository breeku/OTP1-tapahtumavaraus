const express = require('express')

const eventsRouter = express.Router()

eventsRouter.get('/', async (req, res) => {
    res.send({ content: 'root' })
})

eventsRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = eventsRouter
