import API from './API'


const recurso = 'usuarios/';

export default {
    list(){
        return API.get(recurso);
    },
    create(data){
        return API.post(recurso, data);
    }
}