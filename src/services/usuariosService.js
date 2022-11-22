import API from './API'


const recurso = 'usuarios/';

export default {
    list(){
        return API.get(recurso, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('access') }`
            }
        });
    },
    create(data){
        return API.post(recurso, data, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('access') }`
            }
        });
    }
}