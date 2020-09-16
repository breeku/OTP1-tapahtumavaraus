import axios from 'axios'

export const getTagNames = async tagNames => {
    const response = await axios.get('api/tags/')
    return response
}
