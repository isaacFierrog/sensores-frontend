import Servicio from "./servicio.js";

const recurso = 'modulos/';
const ls = localStorage;

export default {
    get() {
        return Servicio.get(recurso, {
            headers: {
                'Authorization': `Bearer ${ls.getItem('access')}`,
                'Content-type': 'application/json; charset=utf-8'
            }
        });
    },
    create(data){
        return Servicio.post(recurso, data, {
            headers: {
                'Authorization': `Bearer ${ls.getItem('access')}`,
                'Content-type': 'application/json; charset=utf-8'
            }
        });
    }, 
    retrieve(id) {
        return Servicio.get(`${recurso}${id}/`, {
            headers: {
                'Authorization': `Bearer ${ls.getItem('access')}`,
                'Content-type': 'application/json; charset=utf-8'
            }
        })
    },
    update(id, data){
        return Servicio.patch(`${recurso}${id}/`, data, {
            headers: {
                'Authorization': `Bearer ${ls.getItem('access')}`,
                'Content-type': 'application/json; charset=utf-8'
            }
        })
    }
}