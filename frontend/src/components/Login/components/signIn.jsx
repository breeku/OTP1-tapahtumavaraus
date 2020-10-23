import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { login } from '../../../services/auth'
import { AuthContext } from '../../../context/auth'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loginFail: {
        color: 'red',
    },
}))

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginFail, setLoginFail] = useState(false)
    const classes = useStyles()
    const { authDispatch } = React.useContext(AuthContext)
    const history = useHistory()
    const [t, i18n] = useTranslation()

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        const token = await login(email, password)

        if (token) {
            authDispatch({
                type: 'LOGIN',
                payload: token,
            })
            history.push('/')
        } else {
            setLoginFail(true)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('Kirjaudu')}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        data-cy="kirjSahkoposti"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Sähköposti"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChangeEmail}
                    />
                    <TextField
                        data-cy="kirjSalasana"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Salasana"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChangePassword}
                    />
                    <Button
                        data-cy="kirjauduNappi"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}>
                        {t('Kirjaudu')}
                    </Button>
                    {loginFail && (
                        <div className={classes.loginFail}>{t('KirjautuminenEpaonnistui')}</div>
                    )}
                </form>
            </div>
        </Container>
    )
}

export default SignIn
