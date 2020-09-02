const express = require('express')

const activitiesRouter = express.Router()

activitiesRouter.get('/', async (req, res) => {
    res.send({ content: 'root' })
})

activitiesRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = activitiesRouter
