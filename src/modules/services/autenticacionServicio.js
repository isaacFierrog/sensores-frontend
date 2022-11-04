import Servicio from "./servicio.js";


const recurso = 'login/';

export default {
    post(data) {
        return Servicio.post(recurso, data);
    }
}