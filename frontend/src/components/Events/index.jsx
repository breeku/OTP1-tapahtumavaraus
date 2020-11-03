import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getEvents } from '../../services/events'
import EventList from './EventList'
import SearchBarComponents from './SearchBar'

// Frame for event search page

const useStyles = makeStyles(theme => ({
    text_center: {
        color: 'white',
        textAlign: 'center',
        textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    },
    eventImage: {
        width: '300px',
        height: '300px',
        alignSelf: 'center',
    },
    event: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
        color: 'white',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    rootElement: {
        background:
            'url("https://upload.wikimedia.org/wikipedia/commons/b/b8/The_Stairs_Paola_Italy_Black_And_White_Street_Photography_%28233602113%29.jpeg") no-repeat center center fixed',
        backgroundSize: 'cover',
        height: '100%',
        margin: '0',
        padding: '0',
        position: 'relative',
        minHeight: '100vh',
    },
    paper: {
        width: '40%',
        marginLeft: '23%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(44, 44, 44, 0.9)',
        padding: '4rem 8rem',
        border: '3px solid #ffffff',
        borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',
        color: '#ffffff',
    },
    searchElement: {
        display: 'inline-block',
    },
    searchBar: {
        backgroundColor: 'rgba(44, 44, 44, 0.9)',
    },
    closeIcon: {
        color: '#ffffff',
    },
    removeTag: {
        color: '#ffffff',
    },
}))

export default function Events() {
    const [events, setEvents] = useState(null)
    const [language, setLanguage] = useState(null)
    const [tags, setTags] = useState([])
    const [resultLimit, setResultLimit] = useState(10)
    const classes = useStyles()

    useEffect(() => {
        const getData = async () => {
            const response = await getEvents(language, resultLimit, tags)
            setEvents(response.data)
        }

        if (language && tags.length > 0) getData()
    }, [language, resultLimit, tags])

    return (
        <div className={classes.rootElement}>
            <SearchBarComponents
                classes={classes}
                tags={tags}
                setTags={setTags}
                language={language}
                setLanguage={setLanguage}
                resultLimit={resultLimit}
                setResultLimit={setResultLimit}
            />
            <EventList
                classes={classes}
                tags={tags}
                language={language}
                events={events}
            />
        </div>
    )
}
