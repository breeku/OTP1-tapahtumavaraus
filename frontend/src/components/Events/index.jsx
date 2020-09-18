import React, { useState, useEffect } from 'react'

import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import {
    Paper,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
} from '@material-ui/core'

import { Link } from 'react-router-dom'

import { getEvents } from '../../services/events'
import { getTagNames } from '../../services/getTagNames'

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
    const classes = useStyles()
    const [language, setLanguage] = React.useState(null)
    const [tags, setTags] = React.useState([])
    const [tagList, setTagList] = React.useState([])
    const [openLang, setOpenLang] = React.useState(false)
    const [openResult, setOpenResult] = React.useState(false)
    const [openTags, setOpenTags] = React.useState(false)
    const [resultLimit, setResultLimit] = React.useState(10)

    const handleChangeTags = event => {
        setTags([...tags, event.target.value])
    }

    const handleCloseTags = () => {
        setOpenTags(false)
    }

    const handleOpenTags = () => {
        setOpenTags(true)
    }

    const handleChangeLang = event => {
        setLanguage(event.target.value)
    }

    const handleCloseLang = () => {
        setOpenLang(false)
    }

    const handleOpenLang = () => {
        setOpenLang(true)
    }

    const handleChangeResultLimit = event => {
        setResultLimit(event.target.value)
    }

    const handleCloseResultLimit = () => {
        setOpenResult(false)
    }

    const handleOpenResultLimit = () => {
        setOpenResult(true)
    }

    const removeFromTags = event => {
        console.log(event)
        setTags(tags.filter(value => value !== event))
    }

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

    useEffect(() => {
        const getData = async () => {
            const response = await getEvents(language, resultLimit, tags)
            setEvents(response.data)
        }

        if (language && tags) getData()
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
            <MuiThemeProvider theme={colortheme}>
                <div className={classes.searchBar}>
                    <div className={classes.searchElement}>
                        <Button className={classes.button} onClick={handleOpenTags}>
                            Valitse haku-tag
                        </Button>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="tag-label">Tag</InputLabel>
                            <Select
                                disableUnderline
                                class={classes.searchSelect}
                                labelId="tag-label"
                                id="tag-label"
                                open={openTags}
                                onClose={handleCloseTags}
                                onOpen={handleOpenTags}
                                value={tags}
                                onChange={handleChangeTags}>
                                {tagList.sort().map(tag => {
                                    return <MenuItem value={tag}>{tag}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <ul className={classes.searchElement}>
                        {tags.map(tag => {
                            return (
                                <>
                                    <li className={classes.removeTag} value={tag}>
                                        {tag}
                                    </li>
                                    <Button onClick={() => removeFromTags(tag)}>
                                        <CloseIcon className={classes.closeIcon} />
                                    </Button>
                                </>
                            )
                        })}
                    </ul>
                    <div className={classes.searchElement}>
                        <Button className={classes.button} onClick={handleOpenLang}>
                            Valitse kieli
                        </Button>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="lang-label">Kieli</InputLabel>
                            <Select
                                disableUnderline
                                labelId="lang-label"
                                id="lang-label"
                                open={openLang}
                                onClose={handleCloseLang}
                                onOpen={handleOpenLang}
                                value={language}
                                onChange={handleChangeLang}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'fi'}>FI</MenuItem>
                                <MenuItem value={'en'}>EN</MenuItem>
                                <MenuItem value={'sv'}>SV</MenuItem>
                                <MenuItem value={'zh'}>ZH</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.searchElement}>
                        <Button
                            className={classes.button}
                            id="resultLimit"
                            onClick={handleOpenResultLimit}>
                            Valitse hakutulosten määrä
                        </Button>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="count-label">Määrä</InputLabel>
                            <Select
                                disableUnderline
                                labelId="count-label"
                                id="count-label"
                                open={openResult}
                                onClose={handleCloseResultLimit}
                                onOpen={handleOpenResultLimit}
                                value={resultLimit}
                                onChange={handleChangeResultLimit}>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </MuiThemeProvider>
            <h1 className={classes.text_center}>Tapahtumat</h1>

            {events && (
                <>
                    {events.data.map(event => {
                        return (
                            <Link
                                className={classes.link}
                                to={{ pathname: `/events/${event.id}`, state: event }}>
                                <Paper elevation={3} className={classes.paper}>
                                    <div className={classes.event}>
                                        <p className={classes.text_center}>
                                            {event.description.intro}
                                            <br />
                                            {event.event_dates.starting_day} --{'>'}
                                            {event.event_dates.ending_day}
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
