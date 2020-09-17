import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
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
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    paper: {
        margin: 20,
        padding: 10,
    },
}))

export default function Events() {
    const [events, setEvents] = useState(null)
    const classes = useStyles()
    const [language, setLanguage] = React.useState(null)
    const [tags, setTags] = React.useState(null)
    const [tagList, setTagList] = React.useState([])
    const [openLang, setOpenLang] = React.useState(false)
    const [openResult, setOpenResult] = React.useState(false)
    const [openTags, setOpenTags] = React.useState(false)
    const [resultLimit, setResultLimit] = React.useState(10)

    const handleChangeTags = event => {
        setTags(event.target.value)
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
        <>
            <div>
                <Button className={classes.button} onClick={handleOpenTags}>
                    Valitse haku-tag
                </Button>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Tag</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openTags}
                        onClose={handleCloseTags}
                        onOpen={handleOpenTags}
                        value={tags}
                        onChange={handleChangeTags}>
                        {tagList.map(tag => {
                            return <MenuItem value={tag}>{tag}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button className={classes.button} onClick={handleOpenLang}>
                    Valitse kieli
                </Button>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Kieli</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
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
            <div>
                <Button
                    className={classes.button}
                    id="resultLimit"
                    onClick={handleOpenResultLimit}>
                    Valitse hakutulosten määrä
                </Button>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Määrä</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
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
            <h1 className={classes.text_center}>Tapahtumat</h1>

            {events && (
                <>
                    {events.data.map(event => {
                        return (
                            <Link to={{ pathname: `/events/${event.id}`, state: event }}>
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
        </>
    )
}
