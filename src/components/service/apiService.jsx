import axios from '../../utils/axios-customize'

const postRegister = (fullName, email, password, phone) => {
    return axios.post(`api/v1/user/register`, { fullName, email, password, phone }) 
}
const postLogin = (username, password) => {
    return axios.post(`api/v1/auth/login`, { username, password })
}
const fetchAccount = () => { // lay thong tin nguoi dung moi khi f5
    return axios.get(`api/v1/auth/account`)
}
const postLogout = () => { 
    return axios.post('/api/v1/auth/logout')
}
export { postRegister, postLogin, fetchAccount, postLogout }