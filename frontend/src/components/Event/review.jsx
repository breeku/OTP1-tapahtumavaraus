import React from 'react'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core/'

import { postReview } from '../../services/events'
import { updateReview } from '../../services/events'

//Item for making a review

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '70vh',
        },
    },
}))

const Review = ({ eventId, oldReview }) => {
    const classes = useStyles()
    const [rating, setRating] = React.useState(oldReview ? oldReview.rating : 2)
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
            const success = updateReview
                ? await updateReview(
                      { header: otsikko, content: sisalto, rating },
                      eventId,
                  )
                : await postReview({ header: otsikko, content: sisalto, rating }, eventId)

            success ? setSuccesfulReview(true) : setUnSuccesfulReview(true)
        }
    }

    return (
        <>
            <form data-cy="arvosteluForm" className={classes.root}>
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
                    defaultValue={oldReview ? oldReview.header : ''}
                    data-cy="arvosteluOtsikko"
                    onChange={handleOtsikko}
                    error={otsikkoError}
                    helperText={otsikkoError ? 'Syötä otsikko' : ''}
                />

                <div>
                    <TextField
                        data-cy="arvosteluTekstikentta"
                        id="Arvostelun tekstikenttä"
                        label="Lisätietoja"
                        multiline
                        defaultValue={oldReview ? oldReview.content : ''}
                        required
                        rows={9}
                        onChange={handleSisalto}
                        error={sisaltoError}
                        helperText={sisaltoError ? 'Syötä arvostelun sisältö' : ''}
                    />
                </div>

                <Button
                    data-cy="arvosteluSubmit"
                    aria-label="submit"
                    onClick={() => {
                        submitReview()
                    }}>
                    {t('LahetaArvostelu')}
                </Button>
                {succesfulReview && <h1>{t('ArvosteluOnnistui')}</h1>}
                {unSuccesfulReview && <h1>{t('ArvosteluEpaonnistui')}</h1>}
            </form>
        </>
    )
}

export default Review
