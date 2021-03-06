import React from 'react'

import { getToken } from '../services/auth'

export const AuthContext = React.createContext()

export const authInitialState = {
    isAuthenticated: false,
    token: null,
}

export const authReducer = (state, action) => {
    const token = getToken()
    switch (action.type) {
        case 'CHECK_TOKEN':
            return {
                ...state,
                token,
            }
        case 'LOGIN':
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
            }
        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                token: null,
            }
        default:
            return state
    }
}
