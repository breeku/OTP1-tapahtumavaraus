import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { makeStyles, Paper, Button, Grid } from '@material-ui/core/'
import { getEvent } from '../../services/events'
import Review from './review'
import ReviewTextField from './reviewTextField'
import Reviews from './reviews'
import ReservationElement from './reservationElement'

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
    eventHeader: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: '20px 0 20px 0',
        borderStyle: 'solid',
        borderImage: 'url(https://i.postimg.cc/DZYqPDTD/bordernew.png) 50 0 50 0 repeat',
        webkitBorderImage:
            'url(https://i.postimg.cc/DZYqPDTD/bordernew.png) 50 0 50 0 repeat',
        mozBorderImage:
            'url(https://i.postimg.cc/DZYqPDTD/bordernew.png) 50 0 50 0 repeat',
        borderImageSlice: '50 0 50 0 fill',
        borderImageWidth: '20 0 20 0',
        height: '60px',
    },

    eventDescription: {
        width: '76%',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'block',
        padding: '2%',
    },

    h1: {
        fontFamily: '"dosis", sans-serif',
        maxWidth: '800px',
        margin: '0 5% 1rem',
        fontSize: '2.5rem',
        fontWeight: '600',
    },

    p: {
        backgroundImage:
            'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMjAwMTA5MDQvL0VOIgogICAgICAgICAgICAgICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+Cgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgICB3aWR0aD0iMWluIiBoZWlnaHQ9IjAuNWluIgogICAgIHZpZXdCb3g9IjAgMCAzMDAgMTUwIj4KICA8cGF0aAogICAgICAgIGZpbGw9IiNmZmUwMDAiIHN0cm9rZT0ibm9uZSIKICAgICAgICBkPSJNIDEyLjAwLDQ4LjAwCiAgICAgICAgICAgQyAxMi4wMCw1MC4wOSAxMS43OSw1NC45OSAxMi42MCw1Ni43MgogICAgICAgICAgICAgMTUuNTksNjMuMTggMjYuMDksNTYuNjQgMzMuMDAsNjMuMDAKICAgICAgICAgICAgIDMwLjg0LDYzLjE4IDIzLjA1LDYzLjg3IDIxLjgwLDY1LjAyCiAgICAgICAgICAgICAxOC4wMiw2Ny44OCAyMS4yOSw3Ni4zNSAyMS44MCw4MC4wMAogICAgICAgICAgICAgMjEuODAsODAuMDAgMjEuODAsODYuMDAgMjEuODAsODYuMDAKICAgICAgICAgICAgIDIxLjgwLDg2LjAwIDQwLjAwLDg3LjAwIDQwLjAwLDg3LjAwCiAgICAgICAgICAgICAzOS45Myw4OC44OCA0MC4wNiw5MS4wNCAzOC45OCw5Mi42OQogICAgICAgICAgICAgMzcuNTEsOTQuOTMgMzUuMTUsOTQuNzUgMzIuNTksOTYuMjAKICAgICAgICAgICAgIDI4LjMzLDk4LjYxIDI2Ljg3LDEwMi4yMiAyNy4zNCwxMDcuMDAKICAgICAgICAgICAgIDI3LjM0LDEwNy4wMCAzMC4wMiwxMjMuNDEgMzAuMDIsMTIzLjQxCiAgICAgICAgICAgICAzMS44MiwxMjUuNzUgNDAuMDEsMTI3Ljk1IDQzLjAwLDEyOC4wMAogICAgICAgICAgICAgNDMuMDAsMTI4LjAwIDg3LjAwLDEyOC4wMCA4Ny4wMCwxMjguMDAKICAgICAgICAgICAgIDg4LjA4LDEyMS41NiA5MS4xNiwxMjEuODAgOTcuMDAsMTIyLjA0CiAgICAgICAgICAgICA5Ny4wMCwxMjIuMDQgMTA5LjAwLDEyMy4wMCAxMDkuMDAsMTIzLjAwCiAgICAgICAgICAgICAxMDkuMDAsMTIzLjAwIDEyOC4wMCwxMjMuMDAgMTI4LjAwLDEyMy4wMAogICAgICAgICAgICAgMTI4LjAwLDEyMy4wMCAxODIuMDAsMTIyLjAwIDE4Mi4wMCwxMjIuMDAKICAgICAgICAgICAgIDE5NC41OCwxMjEuOTcgMTg4LjQyLDExOS4wMyAyMDEuMDAsMTE5LjAwCiAgICAgICAgICAgICAyMDEuMDAsMTE5LjAwIDI0My4wMCwxMTkuMDAgMjQzLjAwLDExOS4wMAogICAgICAgICAgICAgMjQzLjAwLDExOS4wMCAyNTguMDAsMTE4LjAwIDI1OC4wMCwxMTguMDAKICAgICAgICAgICAgIDI1OS41MywxMDkuMTAgMjY2LjAxLDExMy4zNyAyNzAuNDAsMTA5LjE1CiAgICAgICAgICAgICAyNzIuNjEsMTA3LjAzIDI3Mi4zMCwxMDAuODUgMjcyLjAwLDk4LjAwCiAgICAgICAgICAgICAyNzIuMDAsOTguMDAgMjgwLjAwLDk3LjAwIDI4MC4wMCw5Ny4wMAogICAgICAgICAgICAgMjgwLjAwLDk0LjEwIDI4MC4yNiw4OC41NSAyNzkuMjYsODYuMDIKICAgICAgICAgICAgIDI3Ni40OSw3OC45OCAyNjQuNjMsNzYuODggMjU4LjAwLDc2LjAwCiAgICAgICAgICAgICAyNjUuMTUsNjkuMTkgMjc2LjQwLDczLjAzIDI3NC44NSw2Mi4wNAogICAgICAgICAgICAgMjc0LjQ3LDU5LjM1IDI3My43Myw1OC44NSAyNzIuMDAsNTcuMDAKICAgICAgICAgICAgIDI4MS42OCw1My43NyAyODEuMDAsNTQuMjggMjgxLjAwLDQ0LjAwCiAgICAgICAgICAgICAyODEuMDAsNDQuMDAgMjU4LjAwLDQyLjM4IDI1OC4wMCw0Mi4zOAogICAgICAgICAgICAgMjUwLjAwLDQwLjg0IDI1MS40OCwzOC4wMyAyMzUuMDAsMzguMDAKICAgICAgICAgICAgIDIzNS4wMCwzOC4wMCAxODkuMDAsMzkuMDAgMTg5LjAwLDM5LjAwCiAgICAgICAgICAgICAxODkuMDAsMzkuMDAgMTc3LjAwLDM5LjgyIDE3Ny4wMCwzOS44MgogICAgICAgICAgICAgMTc3LjAwLDM5LjgyIDE1OS4wMCwzOC4wMCAxNTkuMDAsMzguMDAKICAgICAgICAgICAgIDE1OS4wMCwzOC4wMCAxMjguMDAsMzguMDAgMTI4LjAwLDM4LjAwCiAgICAgICAgICAgICAxMTYuOTAsMzguMDIgMTIwLjE2LDM5LjQwIDExMy4wMCw0MC42NwogICAgICAgICAgICAgMTEzLjAwLDQwLjY3IDk3LjAwLDQyLjE3IDk3LjAwLDQyLjE3CiAgICAgICAgICAgICA5Ny4wMCw0Mi4xNyA4Ny4wMCw0My44MyA4Ny4wMCw0My44MwogICAgICAgICAgICAgODcuMDAsNDMuODMgNTcuMDAsNDUuMDAgNTcuMDAsNDUuMDAKICAgICAgICAgICAgIDU3LjAwLDQ1LjAwIDMyLjAwLDQ4LjAwIDMyLjAwLDQ4LjAwCiAgICAgICAgICAgICAzMi4wMCw0OC4wMCAxMi4wMCw0OC4wMCAxMi4wMCw0OC4wMCBaIiAvPgo8L3N2Zz4K)',
        backgroundPosition: '50% 50%',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '5px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontFamily: '"Baloo Bhaina 2", cursive',
        maxWidth: '800px',
        margin: '0 5% 1rem',
        fontSize: '1.125rem',
    },

    eventImage: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        filter: 'blur(2px)',
    },

    button: {
        paddingTop: '45%',
    },
}))

export default function Event() {
    const location = useLocation()
    const [event, setEvent] = useState(location && location.state)
    const eventId = location && location.pathname.substring(8)
    const classes = useStyles()
    const [reviewElement, setReviewElement] = useState(false)
    const [reviews, setReviews] = useState([])
    const [reservationElement, setReservationElement] = useState(false)
    const [reservationCount, setReservationCount] = useState('')

    useEffect(() => {
        const getData = async () => {
            const { data } = await getEvent(eventId, !event)
            if (!event) setEvent(data.Event)
            if (data.Reviews) setReviews(data.Reviews)
            if (data.Reservations) setReservationCount(data.Reservations.length)
        }
        if (eventId) getData()
    }, [event, eventId])
    return (
        <div className={classes.root}>
            {event && (
                <>
                    <Paper elevation={3} className={classes.eventHeader}>
                        <h1>
                            {event.name.fi ||
                                event.name.en ||
                                event.name.sv ||
                                event.name.zh}
                        </h1>
                        <br />
                    </Paper>
                    <br />
                    <Paper elevation={3} className={classes.eventDescription}>
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                {' '}
                                <p className={classes.p}>{event.description.intro}</p>
                                <Button
                                    data-cy="varaaNappi"
                                    className={classes.button}
                                    onClick={() => {
                                        setReservationElement(true)
                                        setReviewElement(false)
                                    }}>
                                    Varaa
                                </Button>
                                <Button
                                    data-cy="arvosteluNappi"
                                    className={classes.button}
                                    onClick={() => {
                                        setReviewElement(true)
                                        setReservationElement(false)
                                    }}>
                                    Arvostele
                                </Button>
                            </Grid>
                            <Grid item sm={6}>
                                {event.description.images[0] && (
                                    <img
                                        alt={event.description.intro}
                                        className={classes.eventImage}
                                        src={event.description.images[0].url}></img>
                                )}
                            </Grid>
                        </Grid>
                        <div>
                            {reservationElement && !reviewElement && (
                                <>
                                    <ReservationElement eventId={eventId} />
                                    <h1>Varausten kokonaismäärä:<br/>{reservationCount}</h1>
                                </>
                            )}
                            {reviewElement && !reservationElement && (
                                <>
                                    <Review />
                                    <ReviewTextField />
                                </>
                            )}
                            {!reviewElement && !reservationElement && (
                                <>
                                    <Reviews data={reviews} />
                                </>
                            )}
                        </div>
                    </Paper>
                </>
            )}
        </div>
    )
}
