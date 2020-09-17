import axios from 'axios'

export const getTagNames = async () => {
    const response = await axios.get('api/tags/')
    return response
}
