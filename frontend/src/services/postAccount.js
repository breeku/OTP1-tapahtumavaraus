import axios from 'axios'
import { BASEURL } from './config'

export const postAccount = async ({ firstName, lastName, username, email, password }) => {
    const account = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
    }

    await axios.post(BASEURL + '/api/register', account)
}
