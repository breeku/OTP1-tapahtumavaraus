import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Button } from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Review from '../Event/review'
import { AuthContext } from '../../context/auth'
import { getToken, getProfileData } from '../../services/auth'
import { getEvent, removeReview } from '../../services/profileEvents'

const useStyles = makeStyles(() => ({
    text_center: {
        color: 'white',
        textAlign: 'center',
        textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    },
    rootElement: {
        background:
            'url("https://upload.wikimedia.org/wikipedia/commons/b/b8/The_Stairs_Paola_Italy_Black_And_White_Street_Photography_%28233602113%29.jpeg") no-repeat center center fixed',
        backgroundSize: 'cover',
        height: '80%',
        margin: '0',
        padding: '3%',
        position: 'relative',
        minHeight: '100vh',
    },
    paper: {
        width: '40%',
        marginLeft: '23%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(44, 44, 44, 0.9)',
        padding: '4rem 8rem',
        border: '3px solid #ffffff',
        borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',
        color: '#ffffff',
        marginTop: '0%',
    },
    listElement: {
        backgroundColor: 'white',
        padding: '3%',
        color: 'black',
        border: '3px solid black',
        borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',
        fontFamily: 'serif',
        fontSize: '140%',
        margin: '1%',
    },
    link: {
        color: '#00d4db',
    },
    logOutButton: {
        color: '#ff5454',
        fontSize: '100px',
    },
}))

/**
 * Profiilisivun pääkomponentti
 *
 * @component
 * @category Profiili
 * @subcategory frontend
 */

const Profile = () => {
    const [modifyReview, setModifyReview] = useState(null)
    const classes = useStyles()
    const [profileData, setProfileData] = useState(null)
    const [events, setEvents] = useState(null)
    const history = useHistory()
    const { authDispatch } = React.useContext(AuthContext)
    const { t } = useTranslation()

    useEffect(() => {
        const getData = async () => {
            const token = getToken()
            if (token) {
                setProfileData(getProfileData())
                const event = await getEvent(token)
                setEvents(event)
            } else {
                history.push('/')
            }
        }

        getData()
    }, [history])

    const handleLogout = async () => {
        authDispatch({
            type: 'LOGOUT',
        })
        history.push('/')
    }

    const handleReviewRemove = async eventID => {
        const token = getToken()

        const success = await removeReview(token, eventID)
        if (success) {
            setEvents({
                ...events,
                Reviews: events.Reviews.filter(x => x.Event.id !== eventID),
            })
        } else {
            // virheilmotus
        }
    }

    const setReview = (eventId, review) => {
        setEvents({
            ...events,
            Reviews: events.Reviews.map(x =>
                x.Event.id === eventId ? { ...x, Review: review } : x,
            ),
        })
    }

    return (
        <>
            <div className={classes.rootElement}>
                <h3 className={classes.paper}>
                    {profileData && (
                        <>
                            <p className={classes.listElement}>
                                {t('Nimi')} : {profileData.first_name}{' '}
                                {profileData.last_name}
                            </p>
                            <p className={classes.listElement}>
                                {t('SPosti')} : {profileData.email}
                            </p>
                            <p className={classes.listElement}>
                                {t('Kayttajanimi')} : {profileData.username}
                            </p>
                            <Button
                                data-cy='ulosKirjNappi'
                                className={classes.logOutButton}
                                onClick={handleLogout}>
                                <ExitToAppIcon className={classes.logOutButton} />
                            </Button>
                        </>
                    )}
                    {events && (
                        <>
                            <h1>{t('Tapahtumat')}</h1>
                            <h2>{t('Varaukset')}</h2>
                            {events.Reservations.map(reservation => (
                                <>
                                    <Link
                                        className={classes.link}
                                        to={{
                                            pathname: `/events/${reservation.Event.id}`,
                                            state: reservation.Event,
                                        }}>
                                        <h3>{reservation.Event.name.fi}</h3>
                                    </Link>
                                </>
                            ))}
                            <h2>{t('Arvostelut')}</h2>
                            {events.Reviews.map(review => (
                                <>
                                    <Link
                                        className={classes.link}
                                        to={{
                                            pathname: `/events/${review.Event.id}`,
                                            state: review.Event,
                                        }}>
                                        <h3>{review.Event.name.fi}</h3>
                                    </Link>
                                    <h4>{review.Review.header}</h4>
                                    <Rating
                                        name='simple-controlled'
                                        value={review.Review.rating}
                                        readOnly
                                    />
                                    <p>{review.Review.content}</p>
                                    <Button
                                        data-cy='poistaArvostelu'
                                        onClick={() =>
                                            handleReviewRemove(review.Event.id)
                                        }>
                                        <HighlightOffIcon />
                                        {t('PoistaArvostelu')}
                                    </Button>

                                    <Button
                                        data-cy='muokkaaArvostelu'
                                        onClick={() =>
                                            setModifyReview(
                                                modifyReview !== review.Event.id
                                                    ? review.Event.id
                                                    : null,
                                            )
                                        }>
                                        {t('MuokkaaArvostelu')}
                                    </Button>
                                    {modifyReview === review.Event.id && (
                                        <Review
                                            color='lightgrey'
                                            eventId={review.Event.id}
                                            oldReview={{ ...review.Review, setReview }}
                                        />
                                    )}
                                </>
                            ))}
                        </>
                    )}
                </h3>
            </div>
        </>
    )
}

export default Profile
