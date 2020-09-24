import axios from 'axios'
import { BASEURL } from './config'

export const getEvents = async (language, resultLimit, tags) => {
    const response = await axios.get(
        BASEURL + '/api/events/' + language + '/' + resultLimit + '/' + tags,
    )
    return response
}

export const getEvent = async eventId => {
    const response = await axios.get(BASEURL + '/api/events/' + eventId)
    return response
}
