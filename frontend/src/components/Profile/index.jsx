import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { getProfileData } from '../../services/auth'
import { getEvent } from '../../services/profileEvents'
import { getToken } from '../../services/auth'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
}))

export default function Profile() {
    const classes = useStyles()
    const data = getProfileData()
    const [event, setEvent] = useState('')

    useEffect(() => {
        const getData = async () => {
            const token = getToken()
            const event = await getEvent(token)
            setEvent(event)
        }

        getData()
    }, [])

    return (
        <div>
            <h1 className={classes.text_center}>
                {data.username}
                <br />
                {data.email}
                <br />
                {data.first_name}
                <br />
                {data.last_name}
            </h1>
            <p>{event && event.Reservation.Event.id}</p>
        </div>
    )
}
