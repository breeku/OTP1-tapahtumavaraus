import axios from 'axios'

export const getActivities = async () => {
    const response = await axios.get('/api/activities')
    return response
}
