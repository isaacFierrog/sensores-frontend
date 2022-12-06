import API from "./API"


const recurso = 'modulos/';

export default {
    list(page) {
        return API.get(recurso, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('access') }`
            },
            params: {
                page
            }
        });
    },
    create(data) {
        return API.post(recurso, data, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('access') }`
            }
        });
    },
    retrieve(id){
        return API.get(`${recurso}${id}/`, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('access') }`
            }
        })
    },
    update(id, data){
        return API.patch(`${recurso}${id}/`, data, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('access') }`
            }
        })
    }
}