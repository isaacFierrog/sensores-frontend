import Servicio from "./servicio";


const recurso = 'login/refresh/';
const ls = localStorage;
const config = {
    headers: {
        'Authorization': `Bearer ${ls.getItem('access')}`
    }
};

export default {
    post(data){
        return Servicio.post(recurso, data);
    }
}