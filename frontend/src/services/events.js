import axios from 'axios'
import { BASEURL } from './config'
import { getToken } from './auth'

/**
 * @method
 * @param {string} language
 * @param {number} resultLimit
 * @param {string} tags
 * @returns {string} events by search
 */

export const getEvents = async (language, resultLimit, tags) => {
    const response = await axios.get(
        `${BASEURL}/api/events/${language}/${resultLimit}/${tags}`,
    )
    return response
}

/**
 * @method
 * @param {number} eventId
 * @param {boolean} fetchEvent
 * @returns {string} event
 */

export const getEvent = async (eventId, fetchEvent) => {
    const response = await axios.get(`${BASEURL}/api/events/${eventId}/${fetchEvent}`)
    return response
}

/**
 * @method
 * @param {number} eventId
 * @param {number} reservationCount
 * @returns {boolean} succesful
 */

export const postReservationCount = async (eventId, reservationCount) => {
    try {
        const token = getToken()
        await axios.get(
            `${BASEURL}/api/events/reservation/${eventId}/${reservationCount}`,
            {
                headers: {
                    authorization: token,
                },
            },
        )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

/**
 * @method
 * @param {string} arvostelu
 * @param {number} eventId
 * @returns {boolean} succesful
 */

export const postReview = async (arvostelu, eventId) => {
    try {
        const token = getToken()
        await axios.post(`${BASEURL}/api/events/review/${eventId}`, arvostelu, {
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

/**
 * @method
 * @param {string} arvostelu
 * @param {number} eventId
 * @returns {boolean} succesful
 */

export const updateReview = async (arvostelu, eventId) => {
    try {
        const token = getToken()
        await axios.post(`${BASEURL}/api/events/review/${eventId}/update`, arvostelu, {
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
