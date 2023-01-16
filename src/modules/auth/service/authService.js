import service from '@/services/service'


const recurso = 'login/';


export default {
    login(data){
        return service.post(recurso, data);
    },
    refresh(data){
        return service.post(`${recurso}refresh/`, data);
    }
}