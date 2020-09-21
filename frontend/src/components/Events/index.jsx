import React, { useState, useEffect } from 'react'

import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

import { getEvents } from '../../services/events'
import { getTagNames } from '../../services/getTagNames'
import EventsList from './EventsList'
import SearchBarComponents from './SearchBarComponents'

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

const colortheme = createMuiTheme({
    palette: {
        primary: { main: '#ffffff', contrastText: '#fff' },
    },
    overrides: {
        MuiSelect: {
            icon: {
                color: '#ffffff',
            },
            selectMenu: {
                color: '#ffffff',
            },
        },
        MuiInputLabel: {
            root: {
                color: '#ffffff',
            },
        },
    },
})

export default function Events() {
    const [events, setEvents] = useState(null)
    const classes = useStyles()
    const [language, setLanguage] = React.useState(null)
    const [tags, setTags] = React.useState([])
    const [tagList, setTagList] = React.useState([])
    const [resultLimit, setResultLimit] = React.useState(10)

    useEffect(() => {
        const getData = async () => {
            const response = await getEvents(language, resultLimit, tags)
            setEvents(response.data)
        }

        if (language && tags.length > 0) getData()
    }, [language, resultLimit, tags])

    useEffect(() => {
        const getData = async () => {
            const response = await getTagNames()
            setTagList(response.data)
        }
        if (tagList.length === 0) getData()
    }, [tagList.length])

    return (
        <div className={classes.rootElement}>
            <SearchBarComponents
                colortheme={colortheme}
                classes={classes}
                tags={tags}
                tagList={tagList}
                language={language}
                resultLimit={resultLimit}
                setTags={setTags}
                setLanguage={setLanguage}
                setResultLimit={setResultLimit}
            />
            <EventsList
                events={events}
                classes={classes}
                language={language}
                tags={tags}
            />
        </div>
    )
}
