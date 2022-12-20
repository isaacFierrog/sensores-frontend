import axios from 'axios'


// const baseURL = 'http://192.168.1.137:8001/api/';
const baseURL = 'http://3.101.0.40:8000/api/';

export default axios.create({
    baseURL,
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
});