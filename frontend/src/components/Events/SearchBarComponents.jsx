import React from 'react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const SearchBarComponents = ({
    colortheme,
    classes,
    tags,
    tagList,
    language,
    resultLimit,
    setTags,
    setLanguage,
    setResultLimit,
}) => {
    const [openLang, setOpenLang] = React.useState(false)
    const [openResult, setOpenResult] = React.useState(false)
    const [openTags, setOpenTags] = React.useState(false)

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
        </div>
    )
}
export default SearchBarComponents
