import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '70vh',
        },
    },
}))

const ReviewTextField = () => {
    const classes = useStyles()

    return (
        <form className={classes.root}>
            <div>
                <TextField
                    id="standard-multiline-static"
                    label="Lisätietoja"
                    multiline
                    rows={9}
                />
            </div>
        </form>
    )
}

export default ReviewTextField
