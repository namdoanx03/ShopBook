import axios from 'axios'; // ket noi backend va frontend
import { Mutex } from "async-mutex";

const mutex = new Mutex();


const baseURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,//set cookies

});
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } //doi voi tung request gan token vao, token nay lay tu localStorage


//
const handleRefreshToken = async () =>{
    // const res = await instance.get('api/v1/auth/refresh') // goi api refresh token
    // if (res && res.data) return res.data.access_token
    // return null
    return await mutex.runExclusive(async () => {
        const res = await instance.get('/api/v1/auth/refresh');
        if (res && res.data) return res.data.access_token;
        else return null;
    });

}

//interceptor : can thiep vao truoc khi gui request va sau khi nhan response muon lam gi
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
const NO_RETRY_HEADER = 'x-no-retry'

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
},async function (error) {
    if (error.config && error.response 
        && +error.response.status === 401 
        && !error.config.headers[NO_RETRY_HEADER]) {
       const access_token = await handleRefreshToken()
        error.config.headers[NO_RETRY_HEADER] = 'true'
       if(access_token){
           error.config.headers['Authorization'] = `Bearer ${access_token}`
           localStorage.setItem('access_token', access_token)
           return instance.request(error.config);
       }
    }

    if (error.config && error.response
        && +error.response.status === 400
        && error.config.url === 'api/v1/auth/refresh') 
        {
        if (
            window.location.pathname !== '/'
            && !window.location.pathname.startsWith('/book')
        ) {
            window.location.href = '/login';
        }
    }
    // xu li loi 401 khong xac thuc duoc nguoi dung
    //Is it possible to add a retry method to axios? #934
    // AXIOS retry - handle refresh token
    // handle Axios Retry Infinite Loop
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error);
});

export default instance;
