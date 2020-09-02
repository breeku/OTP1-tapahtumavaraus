import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
}))

export default function Events() {
    const classes = useStyles()
    return (
        <div>
            <h1 className={classes.text_center}>Tapahtumat</h1>
        </div>
    )
}
