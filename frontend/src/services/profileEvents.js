import axios from 'axios'
import { BASEURL } from './config'

export const getEvent = async token => {
    try {
        const { data } = await axios.get(BASEURL + '/api/user/', {
            headers: {
                authorization: token,
            },
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const removeReview = async (token, eventID) => {
    try {
        await axios.delete(BASEURL + '/api/events/review/' + eventID + '/delete', {
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
