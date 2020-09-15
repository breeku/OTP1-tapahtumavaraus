import axios from 'axios'

export const getEvents = async (language, resultLimit) => {
    const response = await axios.get('api/events' + "/" + language + "/" + resultLimit)
    return response
}
