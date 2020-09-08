import axios from 'axios'

export const getEvents = async (language) => {
    console.log(language)
    const response = await axios.get('api/events' + "/" + language)
    return response
}