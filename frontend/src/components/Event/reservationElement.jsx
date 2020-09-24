import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

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

const ReservationElement = ({ data }) => {
    const classes = useStyles()
    const [count, setCount] = React.useState(1)

    return (
        <div className={classes.root}>
            <div>
                <Badge color="secondary" badgeContent={count}></Badge>
                <ButtonGroup>
                    <Button
                        data-cy="vahennaNappiVaraus"
                        aria-label="reduce"
                        onClick={() => {
                            setCount(Math.max(count - 1, 0))
                        }}>
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                        data-cy="lisaaNappiVaraus"
                        aria-label="increase"
                        onClick={() => {
                            setCount(count + 1)
                        }}>
                        <AddIcon fontSize="small" />
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default ReservationElement
