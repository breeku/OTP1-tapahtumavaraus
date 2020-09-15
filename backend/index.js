require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const activitiesRouter = require('./routes/activities')
const eventsRouter = require('./routes/events')
const placesRouter = require('./routes/places')
const searchRouter = require('./routes/places')

const app = express()

app.use(cors())

app.use('/api/activities', activitiesRouter)
app.use('/api/events', eventsRouter)
app.use('/api/places', placesRouter)
app.use('/api/search', searchRouter)

app.listen(process.env.PORT || 5000)
