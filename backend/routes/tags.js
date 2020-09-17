const express = require('express')
const { Op } = require('sequelize')
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

tagsRouter.get('/:search', async (req, res) => {
    const search = req.params.search
    const matchTags = await db.Tags.findAll({
        raw: true,
        where: {
            name: {
                [Op.iLike]: '%' + search + '%',
            },
        },
    })
    const names = matchTags.map(x => x.name)
    res.send(names)
})

module.exports = tagsRouter