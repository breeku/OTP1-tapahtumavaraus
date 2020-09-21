require('dotenv').config()
const express = require('express')
const cors = require('cors')

const eventsRouter = require('./routes/events')
const tagsRouter = require('./routes/tags')

const app = express()

app.use(cors())

app.use('/api/events', eventsRouter)
app.use('/api/tags', tagsRouter)

app.listen(process.env.PORT || 5000)
