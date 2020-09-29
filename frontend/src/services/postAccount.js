import axios from 'axios'
import { BASEURL } from './config'

export const postAccount = async (firstName, lastName, username, email, password) => {
    const account = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
    }

    console.log(account)

    await axios.post(BASEURL + '/api/auth/register', account)
}
