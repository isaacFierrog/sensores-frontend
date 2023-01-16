import API from './API'


const recurso = 'login/';

export default {
    login(data){
        return API.post(recurso, data);
    },
    refresh(data){
        return API.post(`${recurso}refresh/`, data);
    }
}