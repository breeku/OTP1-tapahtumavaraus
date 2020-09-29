require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const eventsRouter = require('./routes/events')
const tagsRouter = require('./routes/tags')
const authRouter = require('./routes/auth')

const app = express()
app.use(bodyParser.json())

require('@cypress/code-coverage/middleware/express')(app)

app.use(cors())

app.use('/api/events', eventsRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/auth', authRouter)

app.listen(process.env.PORT || 5000)
