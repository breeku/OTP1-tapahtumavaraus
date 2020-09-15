const express = require('express')

const searchRouter = express.Router()

searchRouter.get('/', async (req, res) => {
    res.send({ content: 'root' })
})

searchRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = searchRouter
