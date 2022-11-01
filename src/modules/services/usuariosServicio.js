import Servicio from './servicio.js';

const recurso = 'usuarios/';

export default {
    get() {
        return Servicio.get(recurso);
    },
    create(data) {
        return Servicio.post(recurso, data);
    }
}