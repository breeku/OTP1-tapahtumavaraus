import axios from 'axios'
import { BASEURL } from './config'

/**
 *
 * @param {string} token
 * @returns {string} single event
 */

export const getEvent = async token => {
    try {
        const { data } = await axios.get(`${BASEURL}/api/user/`, {
            headers: {
                authorization: token,
            },
        })
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

/**
 *
 * @param {string} token
 * @param {number} eventID
 * @returns {boolean} succesful
 */

export const removeReview = async (token, eventID) => {
    try {
        await axios.delete(`${BASEURL}/api/events/review/${eventID}/delete`, {
            headers: {
                authorization: token,
            },
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
