import axios from 'axios'
import { BASEURL } from './config'
import { getToken } from './auth'

export const getEvents = async (language, resultLimit, tags) => {
    const response = await axios.get(
        `${BASEURL}/api/events/${language}/${resultLimit}/${tags}`,
    )
    return response
}

export const getEvent = async (eventId, fetchEvent) => {
    const response = await axios.get(`${BASEURL}/api/events/${eventId}/${fetchEvent}`)
    return response
}

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

export const updateReview = async (arvostelu, eventId) => {
    try {
        const token = getToken()
        await axios.post(
            BASEURL + '/api/events/review/' + eventId + '/update',
            arvostelu,
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
