import React from 'react'
import { Paper, makeStyles } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
    paper: {
        width: '80%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const EventItem = ({ event }) => {
    const classes = useStyles()

    return (
        <div>
            <h1> </h1>
            {event && (
                <Paper elevation={3} className={classes.paper}>
                    {event.name.fi || event.name.en || event.name.sv || event.name.zh}
                </Paper>
            )}
        </div>
    )
}

export default EventItem
