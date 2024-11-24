import axios from '../../utils/axios-customize'

const postRegister = (fullName, email, password, phone) => {
    return axios.post(`api/v1/user/register`, { fullName, email, password, phone }) 
}
const postLogin = (username, password) => {
    return axios.post(`api/v1/auth/login`, { username, password })
}
export { postRegister, postLogin }