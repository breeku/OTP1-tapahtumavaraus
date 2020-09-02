import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar/'
import Home from './components/Home/'
import Events from './components/Events/'
import Login from './components/Login/'

export const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/events">
                    <Events />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}
