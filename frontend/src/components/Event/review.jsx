import React from 'react'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core/'

import { postReview } from '../../services/events'

//Item for making a review

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '70vh',
        },
    },
}))

const Review = ({ eventId }) => {
    const classes = useStyles()
    const [rating, setRating] = React.useState(2)
    const { t } = useTranslation()
    const [otsikko, setOtsikko] = React.useState('')
    const [sisalto, setSisalto] = React.useState('')
    const [succesfulReview, setSuccesfulReview] = React.useState(false)
    const [unSuccesfulReview, setUnSuccesfulReview] = React.useState(false)
    const [otsikkoError, setOtsikkoError] = React.useState(false)
    const [sisaltoError, setSisaltoError] = React.useState(false)

    const handleOtsikko = event => {
        setOtsikko(event.target.value)
    }

    const handleSisalto = event => {
        setSisalto(event.target.value)
    }

    const submitReview = async () => {
        if (otsikko.length < 1) {
            setOtsikkoError(true)
        } else if (sisalto.length < 1) {
            setSisaltoError(true)
        } else {
            const success = await postReview(
                { header: otsikko, content: sisalto, rating },
                eventId,
            )

            success ? setSuccesfulReview(true) : setUnSuccesfulReview(true)
        }
    }

    return (
        <>
            <div>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">{t('Arvostele')}</Typography>
                    <Rating
                        data-cy="arvosteluTahdet"
                        name="Arvostelun tähdet"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue)
                        }}
                    />
                </Box>
            </div>
            <TextField
                required
                id="Arvostelun otsikkokenttä"
                label="Otsikko"
                defaultValue=""
                onChange={handleOtsikko}
                error={otsikkoError}
                helperText={
                    otsikkoError
                        ? 'Syötä otsikko'
                        : ''
                }
            />
            <form className={classes.root}>
                <div>
                    <TextField
                        data-cy="arvosteluTekstikentta"
                        id="Arvostelun tekstikenttä"
                        label="Lisätietoja"
                        multiline
                        required
                        rows={9}
                        onChange={handleSisalto}
                        error={sisaltoError}
                        helperText={
                            sisaltoError
                                ? 'Syötä arvostelun sisältö'
                                : ''
                        }
                    />
                </div>
            </form>
            <Button
                aria-label="submit"
                onClick={() => {
                    submitReview()
                }}>
                Submit
            </Button>
            {succesfulReview && <h1>Arvostelu onnistui!</h1>}
            {unSuccesfulReview && <h1>Arvostelu epäonnistui!</h1>}
        </>
    )
}

export default Review
