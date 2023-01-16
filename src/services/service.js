import axios from 'axios'


const baseURL = 'http://127.0.0.1:8000/api/';
// const baseURL = 'http://3.101.0.40:8000/api/';

const instance = axios.create({
    baseURL
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access');

        if(token) config.headers['Authorization'] = `Bearer ${token}`;

        return config;
    },
    error => Promise.reject(error)
);

export default instance;