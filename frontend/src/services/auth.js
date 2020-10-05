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
        return data.token
    } catch (error) {
        return null
    }
}

export const register = async (firstName, lastName, username, email, password) => {
    try {
        const account = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: password,
        }

        const { data } = await axios.post(BASEURL + '/api/auth/register', account)

        return data.token
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const getProfileData = () => {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)
    return decoded
}

export const getToken = () => {
    return localStorage.getItem('token')
}
