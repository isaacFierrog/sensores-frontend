import API from "./API"


const recurso = 'modulos/';

export default {
    list(page) {
        return API.get(recurso, {
            params: {
                page
            }
        });
    },
    create(data) {
        return API.post(recurso, data);
    },
    retrieve(id){
        return API.get(`${recurso}${id}/`)
    },
    update(id, data){
        return API.patch(`${recurso}${id}/`, data)
    }
}