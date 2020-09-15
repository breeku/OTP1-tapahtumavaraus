import axios from 'axios'

export const getEvents = async () => {
    const response = await axios.get('/api/events')
    return response
}
