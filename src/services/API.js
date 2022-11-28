import axios from 'axios'


// const baseURL = 'http://127.0.0.1:8000/api/';
const baseURL = 'http://3.101.0.40:8000/api/';

export default axios.create({
    baseURL,
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
});