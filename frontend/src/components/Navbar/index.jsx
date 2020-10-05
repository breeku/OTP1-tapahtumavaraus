import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { AuthContext } from '../../context/auth'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    appBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
}))

export default function Navbar() {
    const classes = useStyles()
    const {
        authState: { token: authToken },
    } = React.useContext(AuthContext)

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>
                            Tapahtumavaraus
                        </Link>
                    </Typography>

                    <Link to="/events" className={classes.link}>
                        <Button data-cy="tapahtumaNav" color="inherit">
                            Tapahtumat
                        </Button>
                    </Link>

                    <Link to="/login" className={classes.link}>

                        {authToken ? (
                            <Link to="/profile" className={classes.link}>
                                <Button data-cy="profiiliNav" color="inherit">
                                    Profiili
                                </Button>
                            </Link>
                        ) : (
                            <Link to="/login" className={classes.link}>
                                <Button data-cy="kirjauduNav" color="inherit">
                                    Kirjaudu
                                </Button>
                            </Link>
                        )}
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}
