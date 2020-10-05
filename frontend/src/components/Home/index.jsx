import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
    rootElement: theme.rootElement,
}))

export default function Home() {
    const classes = useStyles()
    return (
        <div className={classes.rootElement}>
            <h1 className={classes.text_center}>Koti</h1>
        </div>
    )
}
