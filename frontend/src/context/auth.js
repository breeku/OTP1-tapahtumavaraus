import React from 'react'

import { getToken } from '../services/auth'

export const AuthContext = React.createContext()

export const authInitialState = {
    isAuthenticated: false,
    token: null,
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'CHECKTOKEN':
            const token = getToken()
            return {
                ...state,
                isAuthenticated: !!token,
                token,
            }
        case 'LOGIN':
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
            }
        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state
    }
}
