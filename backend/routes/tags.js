const express = require('express')
const db = require('../database/models/index')

const tagsRouter = express.Router()

tagsRouter.get('/', async (req, res) => {
    try {
        const allTags = await db.Tags.findAll({ raw: true })
        const names = allTags.map(x => x.name)
        res.send(names)
    } catch (e) {
        console.warn(e)
    }
})

tagsRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = tagsRouter
