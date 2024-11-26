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
    return axios.post('api/v1/auth/logout')
}
const fetchListUser = (query) => {
    return axios.get(`api/v1/user?${query}`)
}   
const deleteUser = (id) => {
    return axios.delete(`api/v1/user/${id}`)
}
const createUser = (fullName, password, email, phone) => {
    return axios.post(`api/v1/user`, { fullName, password, email, phone })
}
const bulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data)
}
export { postRegister, postLogin, fetchAccount, postLogout, fetchListUser, deleteUser, createUser, bulkCreateUser }