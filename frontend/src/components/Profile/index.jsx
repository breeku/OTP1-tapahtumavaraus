import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { getProfileData } from '../../services/auth'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
}))

export default function Profile() {
    const classes = useStyles()
    const data = getProfileData()

    return (
        <div>
            <h1 className={classes.text_center}>
                {data.username}
                <br />
                {data.email}
                <br />
                {data.first_name}
                <br />
                {data.last_name}
            </h1>
        </div>
    )
}
