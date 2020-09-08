import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { getEvents } from '../../services/events'

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
}))

export default function Events() {
    const [events, setEvents] = useState(null)
    const classes = useStyles()
    const [language, setLanguage] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setLanguage(event.target.value);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

    useEffect(() => {
        const getData = async () => {
            const response = await getEvents(language)
            setEvents(response.data)
        }

        if (language) getData()
    }, [language])

    return (
        <>
        <Button className={classes.button} onClick={handleOpen}>
            Valitse kieli
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Kieli</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={language}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'fi'}>FI</MenuItem>
              <MenuItem value={'en'}>EN</MenuItem>
              <MenuItem value={'sv'}>SV</MenuItem>
              <MenuItem value={'zh'}>ZH</MenuItem>
            </Select>
          </FormControl>
            <h1 className={classes.text_center}>Tapahtumat</h1>
            
            {events && (
                <>
                    {events.data.map(x => {
                        return (
                            <div className={classes.event}>
                                <p className={classes.text_center}>
                                    {x.description.intro}
                                    <br />
                                    {x.event_dates.starting_day} --{'>'}
                                    {x.event_dates.ending_day}
                                </p>
                                {x.description.images[0] && (
                                    <img
                                        className={classes.eventImage}
                                        src={x.description.images[0].url}></img>
                                )}
                            </div>
                        )
                    })}
                </>
            )}
        </>
    )
}