const express = require('express')

const placesRouter = express.Router()

placesRouter.get('/', async (req, res) => {
    res.send({ content: 'root' })
})

placesRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = placesRouter
