import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

// Item for a text field used in a review

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
                    data-cy="arvosteluTekstikentta"
                    id="Arvostelun tekstikenttä"
                    label="Lisätietoja"
                    multiline
                    rows={9}
                />
            </div>
        </form>
    )
}

export default ReviewTextField
