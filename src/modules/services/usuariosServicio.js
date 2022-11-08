import Servicio from './servicio.js';

const recurso = 'usuarios/';
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
    post(data) {
        return Servicio.post(recurso, data, config);
    }
}