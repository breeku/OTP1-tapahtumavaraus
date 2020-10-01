import axios from 'axios'
import { BASEURL } from './config'
import jwt_decode from 'jwt-decode'

export const login = async (email, password) => {
    const account = {
        email: email,
        password: password,
    }

    try {
        const { data } = await axios.post(BASEURL + '/api/auth/login', account)
        localStorage.setItem('token', data.token)
        return true
    } catch (error) {
        return false
    }
}

export const postAccount = async (firstName, lastName, username, email, password) => {
    const account = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
    }

    const { data } = await axios.post(BASEURL + '/api/auth/register', account)

    localStorage.setItem('token', data.token)
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const getUser = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const decoded = jwt_decode(token)
    return decoded.username
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}
