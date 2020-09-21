import React from 'react'
import { Paper } from '@material-ui/core'

import { Link } from 'react-router-dom'
const EventsList = ({ events, classes, language, tags }) => {
    return (
        <div>
            <h1 className={classes.text_center}>Tapahtumat</h1>

            {events && tags.length > 0 && (
                <>
                    {events.data.map(event => {
                        console.log(event)
                        const startDay = new Date(event.event_dates.starting_day).getDay()
                        const startMonth = new Date(
                            event.event_dates.starting_day,
                        ).getMonth()
                        const startYear = new Date(
                            event.event_dates.starting_day,
                        ).getFullYear()
                        const startHour = new Date(
                            event.event_dates.starting_day,
                        ).getHours()
                        const startMinutes = new Date(
                            event.event_dates.starting_day,
                        ).getMinutes()

                        return (
                            <Link
                                className={classes.link}
                                to={{ pathname: `/events/${event.id}`, state: event }}>
                                <Paper elevation={3} className={classes.paper}>
                                    <div className={classes.event}>
                                        <p className={classes.text_center}>
                                            <h1>{event.name[language]}</h1>
                                            <br />
                                            {event.description.intro}
                                            <br />
                                            {startDay}.{startMonth}.{startYear},{' '}
                                            {startHour}.{startMinutes} --{'>'}
                                            {event.event_dates.ending_day}
                                            <br />
                                            {event.location.address.locality},{' '}
                                            {event.location.address.street_address}
                                        </p>
                                        {event.description.images[0] && (
                                            <img
                                                alt={event.description.intro}
                                                className={classes.eventImage}
                                                src={
                                                    event.description.images[0].url
                                                }></img>
                                        )}
                                    </div>
                                </Paper>
                            </Link>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default EventsList
