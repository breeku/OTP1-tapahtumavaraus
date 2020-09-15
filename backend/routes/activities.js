const express = require('express')

const activitiesRouter = express.Router()

activitiesRouter.get('/', async (req, res) => {
    try {
        res.send(null)
    } catch (e) {
        console.error(e)
    }
})

activitiesRouter.get('/:id', async (req, res) => {
    //const id = req.params.id
    res.send({ content: 'id' })
})

module.exports = activitiesRouter
