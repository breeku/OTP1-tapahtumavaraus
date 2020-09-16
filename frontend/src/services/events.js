import axios from 'axios'

export const getEvents = async (language, resultLimit, tags) => {
    const response = await axios.get('api/events' + "/" + language + "/" + resultLimit + "/" + tags)
    return response
}
