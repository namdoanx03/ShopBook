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
const updateUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone })
}
const fetchListBook = (query) => {
    return axios.get(`api/v1/book?${query}`)
}   
const deleteBook = (id) => {
    return axios.delete(`api/v1/book/${id}`)
}
const callFetchCategory = () => { // lay ra danh sach cac the loai sach
    return axios.get(`api/v1/database/category`)
}
const createBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post(`api/v1/book`, { thumbnail, slider, mainText, author, price, sold, quantity, category})
}
const uploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: 'api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}
const updateBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`, {
        thumbnail, slider, mainText, author, price, sold, quantity, category
    })
}
const fetchBookById = (id) => {
    return axios.get(`api/v1/book/${id}`)
}
const callPlaceOrder = (data) => {
    return axios.post('/api/v1/order', {
        ...data
    })
}

const callOrderHistory = () => {
    return axios.get('/api/v1/history');
}

const callUpdateAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        },
    });
}

const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
    return axios.put(`/api/v1/user`, {_id, phone, fullName, avatar})
}

const callUpdatePassword = (email, oldpass, newpass) => {
    return axios.post(`/api/v1/user/change-password`, {email, oldpass, newpass})
}
const callFetchDashboard = () => {
    return axios.get('/api/v1/database/dashboard')
}

const callFetchListOrder = (query) => {
    return axios.get(`/api/v1/order?${query}`)
}

export { postRegister, postLogin, fetchAccount, postLogout, fetchListUser, deleteUser, createUser, bulkCreateUser,
    updateUser, fetchListBook, deleteBook, createBook, callFetchCategory, uploadBookImg, updateBook, fetchBookById, 
    callPlaceOrder, callOrderHistory, callUpdateAvatar, callUpdateUserInfo, callUpdatePassword, callFetchDashboard,
    callFetchListOrder}