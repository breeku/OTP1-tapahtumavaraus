import axios from 'axios'
import { BASEURL } from './config'

/**
 * @returns {string} tags' names
 */

export const getTagNames = async () => {
    const response = await axios.get(`${BASEURL}/api/tags/`)
    return response
}
