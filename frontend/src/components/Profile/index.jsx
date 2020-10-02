import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { getProfileData } from '../../services/auth'
import { getEvent } from '../../services/profileEvents'
import { getToken } from '../../services/auth'
import Reviews from '../Event/reviews'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
}))

export default function Profile() {
    const classes = useStyles()
    const data = getProfileData()
    const [events, setEvents] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const token = getToken()
            const event = await getEvent(token)
            setEvents(event)
        }

        getData()
    }, [])

    return (
        <div className={classes.text_center}>
            <h3>
                {data.username}
                <br />
                {data.email}
                <br />
                {data.first_name}
                <br />
                {data.last_name}
            </h3>
            {events && (
                <>
                    <h1>Tapahtumat</h1>
                    <h2>Varaukset</h2>
                    {events.Reservations.map(reservation => (
                        <>
                            <h3>{reservation.Event.name.fi}</h3>
                        </>
                    ))}
                    <h2>Arvostelut</h2>
                    {events.Reviews.map(review => (
                        <>
                            <h3>{review.Event.name.fi}</h3>
                            <h4>{review.Review.header}</h4>
                            <p>{review.Review.content}</p>
                        </>
                    ))}
                </>
            )}
        </div>
    )
}
