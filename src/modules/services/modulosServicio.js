import Servicio from "./servicio.js";

const recurso = 'modulos/';

export default {
    get() {
        return Servicio.get(recurso);
    },
    create(data){
        return Servicio.post(recurso, data);
    }, 
    retrieve(id) {
        return Servicio.get(`${recurso}${id}/`)
    }
}