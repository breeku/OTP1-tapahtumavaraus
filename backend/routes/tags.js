/** Express router
 * @module routers/tags
 * @requires express
 */

const express = require('express')
const db = require('../database/models/index')

/**
 * Mount express router
 * @type {object}
 * @const
 * @namespace tagsRouter
 */

const tagsRouter = express.Router()

/**
 * Tagien hakeminen
 * @name get/
 * @function
 * @memberof module:routers/tags~tagsRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

tagsRouter.get('/', async (req, res) => {
    try {
        const allTags = await db.Tag.findAll({ raw: true })
        const names = allTags.map(x => x.name)
        res.send(names)
    } catch (e) {
        console.warn(e)
    }
})

module.exports = tagsRouter
