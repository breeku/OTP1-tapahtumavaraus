import React, { useEffect, Suspense } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Events from './components/Events'
import Event from './components/Event'
import Login from './components/Login'
import Profile from './components/Profile'

import { AuthContext, authInitialState, authReducer } from './context/auth'

/**
 * Sovelluksen pääkomponentti
 *
 * @component
 * @category Pääkomponentti
 * @subcategory frontend
 */

export const App = () => {
    const [authState, authDispatch] = React.useReducer(authReducer, authInitialState)
    useEffect(() => {
        authDispatch({ type: 'CHECK_TOKEN' })
    }, [])
    return (
        <Suspense fallback='loading'>
            <AuthContext.Provider
                value={{
                    authState,
                    authDispatch,
                }}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/events/:id' exact>
                            <Event />
                        </Route>
                        <Route path='/events'>
                            <Events />
                        </Route>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route path='/profile'>
                            <Profile />
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </Suspense>
    )
}
