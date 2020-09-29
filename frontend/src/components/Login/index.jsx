import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    link_button: {
        color: '#3f51b5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: '45%',
        width: '10%',
    },
}))

export default function Home() {
    const classes = useStyles()
    const [signInElement, setSignInElement] = useState(true)
    const [signUpElement, setSignUpElement] = useState(false)

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
                    <Button className={classes.link_button} onClick={handleShowSignUp}>
                        Luo käyttäjätunnus
                    </Button>
                </>
            )}
            {!signInElement && signUpElement && (
                <>
                    <SignUp />
                    <Button className={classes.link_button} onClick={handleShowSignIn}>
                        Kirjaudu sisään
                    </Button>
                </>
            )}
        </div>
    )
}
