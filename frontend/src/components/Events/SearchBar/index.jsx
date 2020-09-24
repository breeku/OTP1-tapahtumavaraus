import React, { useState, useEffect } from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { getTagNames } from '../../../services/getTagNames'

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

export default function SearchBarComponents({
    classes,
    tags,
    language,
    resultLimit,
    setTags,
    setLanguage,
    setResultLimit,
}) {
    const [openLang, setOpenLang] = useState(false)
    const [openResult, setOpenResult] = useState(false)
    const [openTags, setOpenTags] = useState(false)
    const [tagList, setTagList] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await getTagNames()
            setTagList(response.data)
        }
        if (tagList.length === 0) getData()
    }, [tagList.length])

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
        setTags(tags.filter(value => value !== event))
    }

    return (
        <div>
            <MuiThemeProvider theme={colortheme}>
                <div className={classes.searchBar}>
                    <div className={classes.searchElement}>
                        <Button data-cy="tagSearchButton" className={classes.button} onClick={handleOpenTags}>
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
                                    return <MenuItem data-cy="tagiLista" value={tag}>{tag}</MenuItem>
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
                            data-cy="hakuMaara"
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
                                <MenuItem data-cy="hakuYksi" value={10}>10</MenuItem>
                                <MenuItem data-cy="hakuKaksi" value={20}>20</MenuItem>
                                <MenuItem data-cy="hakuKolme" value={30}>30</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </MuiThemeProvider>
        </div>
    )
}
