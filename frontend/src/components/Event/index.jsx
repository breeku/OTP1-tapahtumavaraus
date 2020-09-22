import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import EventItem from './EventItem'
import { makeStyles } from '@material-ui/core/'

import { getEvent } from '../../services/events'

const useStyles = makeStyles(theme => ({
    root: {
        background:
            'url("https://upload.wikimedia.org/wikipedia/commons/b/b8/The_Stairs_Paola_Italy_Black_And_White_Street_Photography_%28233602113%29.jpeg") no-repeat center center fixed',
        backgroundSize: 'cover',
        height: '100%',
        margin: '0',
        padding: '2%',
        position: 'relative',
        minHeight: '100vh',
    },
}))

export default function Event() {
    const location = useLocation()
    const event = location && location.state
    const classes = useStyles()

    useEffect(() => {
        const getData = async () => {
            const { data } = await getEvent(event.id)
            console.log(data)
        }
        if (event) getData()
    }, [event])
    return (
        <div className={classes.root}>
            <EventItem event={event} />
        </div>
    )
}
