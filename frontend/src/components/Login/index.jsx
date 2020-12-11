import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import SignIn from './components/signIn'
import SignUp from './components/signUp'

const useStyles = makeStyles(() => ({
    link_button: {
        color: '#3f51b5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: '45%',
        width: '10%',
    },
}))

/**
 * Kirjautumisen pääkomponentti
 *
 * @component
 * @category Kirjautuminen
 * @subcategory frontend
 */

const Login = () => {
    const classes = useStyles()
    const [signInElement, setSignInElement] = useState(true)
    const [signUpElement, setSignUpElement] = useState(false)
    const { t } = useTranslation()

    const handleShowSignIn = () => {
        setSignInElement(true)
        setSignUpElement(false)
    }

    const handleShowSignUp = () => {
        setSignInElement(false)
        setSignUpElement(true)
    }

    return (
        <div>
            {signInElement && !signUpElement && (
                <>
                    <SignIn />
                    <Button
                        data-cy='luokayttajaNappi'
                        className={classes.link_button}
                        onClick={handleShowSignUp}>
                        {t('LuoKayttajatunnus')}
                    </Button>
                </>
            )}
            {!signInElement && signUpElement && (
                <>
                    <SignUp />
                    <Button
                        data-cy='luoKirjasisaan'
                        className={classes.link_button}
                        onClick={handleShowSignIn}>
                        {t('Kirjaudu')}
                    </Button>
                </>
            )}
        </div>
    )
}

export default Login
