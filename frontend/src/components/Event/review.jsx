import React from 'react'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core/'

import { postReview, updateReview } from '../../services/events'

// Item for making a review

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '70vh',
        },
    },
}))

const Review = ({ eventId, oldReview, color }) => {
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
            const success = oldReview
                ? await updateReview(
                      { header: otsikko, content: sisalto, rating },
                      eventId,
                  )
                : await postReview({ header: otsikko, content: sisalto, rating }, eventId)

            if (success) {
                if (oldReview)
                    oldReview.setReview(eventId, {
                        header: otsikko,
                        content: sisalto,
                        rating,
                    })
                setSuccesfulReview(true)
            } else {
                setUnSuccesfulReview(true)
            }
        }
    }

    return (
        <>
            <form data-cy='arvosteluForm' className={classes.root}>
                <div>
                    <Box component='fieldset' mb={3} borderColor='transparent'>
                        <Typography component='legend'>{t('Arvostele')}</Typography>
                        <Rating
                            data-cy='arvosteluTahdet'
                            name='Arvostelun tähdet'
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue)
                            }}
                        />
                    </Box>
                </div>
                <TextField
                    style={{backgroundColor: color}}
                    required
                    id="Arvostelun otsikkokenttä"
                    label={t('ArvosteluOtsikko')}
                    defaultValue={oldReview ? oldReview.header : ''}
                    data-cy="arvosteluOtsikko"
                    onChange={handleOtsikko}
                    error={otsikkoError}
                    helperText={otsikkoError ? 'Syötä otsikko' : ''}
                />

                <div>
                    <TextField
                        style={{backgroundColor: color}}
                        data-cy="arvosteluTekstikentta"
                        id="Arvostelun tekstikenttä"
                        label={t('ArvosteluTekstikentta')}
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
                    style={{backgroundColor: color}}
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
