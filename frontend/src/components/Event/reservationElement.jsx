import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Remove'
import { postReservationCount } from '../../services/events'

// Item for making reservations

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
        '& .MuiBadge-root': {
            marginRight: theme.spacing(4),
        },
    },
}))

/**
 * Varauksen komponentti
 *
 * @component
 * @category Tapahtuma
 * @subcategory frontend
 */

const ReservationElement = ({ eventId }) => {
    const classes = useStyles()
    const [count, setCount] = React.useState(1)
    const [successfulReservation, setSuccessfulReservation] = useState(false)
    const [unsuccessfulReservation, setUnsuccessfulReservation] = useState(false)

    const submitReservations = async () => {
        const success = await postReservationCount(eventId, count)

        success ? setSuccessfulReservation(true) : setUnsuccessfulReservation(true)
    }

    return (
        <div className={classes.root}>
            <div>
                <Badge data-cy='omavarausMaara' color='secondary' badgeContent={count} />
                <ButtonGroup>
                    <Button
                        data-cy='vahennaNappivaraus'
                        aria-label='reduce'
                        onClick={() => {
                            setCount(Math.max(count - 1, 0))
                        }}>
                        <RemoveIcon fontSize='small' />
                    </Button>
                    <Button
                        data-cy='lisaaNappivaraus'
                        aria-label='increase'
                        onClick={() => {
                            setCount(count + 1)
                        }}>
                        <AddIcon fontSize='small' />
                    </Button>
                    <Button
                        data-cy='teeVaraus'
                        aria-label='submit'
                        onClick={() => {
                            submitReservations()
                        }}>
                        <CheckIcon fontSize='small' />
                    </Button>
                </ButtonGroup>
                {successfulReservation && <h1>Varaaminen onnistui!</h1>}
                {unsuccessfulReservation && <h1>Varaaminen epäonnistui!</h1>}
            </div>
        </div>
    )
}

ReservationElement.propTypes = {
    eventId: PropTypes.string.isRequired,
}

export default ReservationElement
