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
        return Servicio.get(recurso, {
            headers: {
                'Authorization': `Bearer ${ls.getItem('access')}`,
                'Content-type': 'application/json; charset=utf-8'
            }
        });
    },
    create(data){
        console.log
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
    }
}