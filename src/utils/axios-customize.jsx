import axios from 'axios'; // ket noi backend va frontend

const baseURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,//set cookies

});
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } //doi voi tung request gan token vao, token nay lay tu localStorage


//interceptor : can thiep vao truoc khi gui request va sau khi nhan response muon lam gi
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error);
});

export default instance;
