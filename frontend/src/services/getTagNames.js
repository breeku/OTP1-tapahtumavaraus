import axios from 'axios'
import { BASEURL } from './config'

export const getTagNames = async () => {
    const response = await axios.get(`${BASEURL}/api/tags/`)
    return response
}
