import axios from 'axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { BASEURL } from './config'

export const login = async (email, password) => {
    const account = {
        email,
        password,
    }

    try {
        const { data } = await axios.post(`${BASEURL}/api/auth/login`, account)
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
            username,
            email,
            password,
        }

        const { data } = await axios.post(`${BASEURL}/api/auth/register`, account)

        return data.token
    } catch (error) {
        console.log(error)
        return false
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
