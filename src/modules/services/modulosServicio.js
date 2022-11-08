import Servicio from "./servicio.js";

const recurso = 'modulos/';
const ls = localStorage;
const config = {
    headers: {
        'Authorization': `Bearer ${ls.getItem('access')}`
    }
};

export default {
    get() {
        return Servicio.get(recurso, config);
    },
    create(data){
        return Servicio.post(recurso, data, config);
    }, 
    retrieve(id) {
        return Servicio.get(`${recurso}${id}/`, config)
    }
}