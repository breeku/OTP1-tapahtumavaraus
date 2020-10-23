import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { AuthContext } from '../../../context/auth'
import { register } from '../../../services/auth'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signUpFail: {
        color: 'red',
    },
}))

const SignUp = () => {
    const classes = useStyles()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const history = useHistory()
    const { authDispatch } = React.useContext(AuthContext)
    const [signUpFail, setSignUpFail] = useState(false)

    const handlePostAccount = () => {
        const postData = async () => {
            const token = await register(firstName, lastName, username, email, password)
            if (token) {
                authDispatch({
                    type: 'LOGIN',
                    payload: token,
                })
                history.push('/')
            } else {
                setSignUpFail(true)
            }
        }

        if (firstName === '') {
        } else if (email === '') {
        } else if (username === '') {
        } else if (lastName === '') {
        } else if (password.length <= 5) {
            setPasswordError(true)
        } else {
            postData()
        }
    }

    const handleChangeFirstName = event => {
        setFirstName(event.target.value)
    }

    const handleChangeLastName = event => {
        setLastName(event.target.value)
    }

    const handleChangeUsername = event => {
        setUsername(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Luo tunnus
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                data-cy="luoEtunimi"
                                id="firstName"
                                label="Etunimi"
                                name="firstName"
                                autoComplete="firstName"
                                onChange={handleChangeFirstName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                data-cy="luoSukunimi"
                                id="lastName"
                                label="Sukunimi"
                                name="lastName"
                                autoComplete="email"
                                onChange={handleChangeLastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                data-cy="luoKayttajaTunnus"
                                id="username"
                                label="Käyttäjätunnus"
                                name="username"
                                autoComplete="username"
                                onChange={handleChangeUsername}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                data-cy="luoSalasana"
                                name="password"
                                label="Salasana"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={
                                    passwordError
                                        ? 'Salasanan pitää olla väh. 5 merkkiä.'
                                        : ''
                                }
                                onChange={handleChangePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                data-cy="luoSahkoposti"
                                id="email"
                                label="Sähköposti"
                                name="email"
                                autoComplete="email"
                                onChange={handleChangeEmail}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        data-cy="luoTunnuksetNappi"
                        className={classes.submit}
                        onClick={handlePostAccount}>
                        Luo tunnus
                    </Button>
                    {signUpFail && (
                        <div className={classes.signUpFail}>
                            Käyttäjätunnuksen luominen epäonnistui
                        </div>
                    )}
                </form>
            </div>
        </Container>
    )
}

export default SignUp
