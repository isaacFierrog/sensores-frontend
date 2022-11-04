import Servicio from "./servicio";


const recurso = 'login/refresh/'

export default {
    post(data){
        return Servicio.post(recurso, data);
    }
}