import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getEvents } from '../../services/events'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
    eventImage: {
        width: '300px',
        height: '300px',
        alignSelf: 'center',
    },
    event: {
        display: 'flex',
        flexDirection: 'column',
    },
}))

export default function Events() {
    const [events, setEvents] = useState(null)
    const classes = useStyles()

    useEffect(() => {
        const getData = async () => {
            const response = await getEvents()
            setEvents(response.data)
        }

        if (!events) getData()
    }, [events])

    return (
        <>
            <h1 className={classes.text_center}>Tapahtumat</h1>
            {events && (
                <>
                    {events.data.map(x => {
                        return (
                            <div className={classes.event}>
                                <p className={classes.text_center}>
                                    {x.description.intro}
                                    <br />
                                    {x.event_dates.starting_day} --{'>'}
                                    {x.event_dates.ending_day}
                                </p>
                                {x.description.images[0] && (
                                    <img
                                        className={classes.eventImage}
                                        src={x.description.images[0].url}></img>
                                )}
                            </div>
                        )
                    })}
                </>
            )}
        </>
    )
}
