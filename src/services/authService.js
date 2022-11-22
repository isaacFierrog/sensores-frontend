import API from './API'


const recurso = 'login/';

export default {
    create(data){
        return API.post(recurso, data);
    }
}