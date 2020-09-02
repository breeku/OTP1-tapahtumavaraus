require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const activitiesRouter = require('./server/routes/activities')
const eventsRouter = require('./server/routes/events')
const placesRouter = require('./server/routes/places')

const app = express()

app.use(cors())

app.use('/activities', activitiesRouter)
app.use('/events', eventsRouter)
app.use('/places', placesRouter)

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(process.env.PORT || 5000)
