import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    text_center: theme.text_center,
}))

export default function Home() {
    const classes = useStyles()
    const [signInElement, setSignInElement] = useState(true)
    const [signUpElement, setSignUpElement] = useState(false)

    return (
        <div>
            {signInElement && !signUpElement && (
                <>
                    <SignIn />
                    <Grid item>
                        <Link href="#" variant="body2">
                            {'Eikö sinulla ole käyttäjätunnusta? Luo käyttäjätunnus'}
                        </Link>
                    </Grid>
                </>
            )}
            ,{!signInElement && signUpElement && <SignUp />}
        </div>
    )
}
