import API from './API'


const recurso = 'login/refresh/';

export default {
    create(data){
        return API.post(recurso, data);
    }
}