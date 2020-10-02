import axios from 'axios'
import { BASEURL } from './config'

export const getEvent = async token => {
    try {
        const { data } = await axios.get(BASEURL + '/api/user/', {
            headers: {
                authorization: token,
            },
        })

        return data
    } catch (error) {
        console.log(error)
    }
}
