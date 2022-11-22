import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import refreshService from '@/services/refreshService';

const ls = localStorage;
export default defineStore('autenticacion', () => {
    const router = useRouter();

    //Propiedades 
    const autenticado = ref(false);
    const referenciaRefresh = ref();

    //Metodos
    const reemplazarTokenAccess = ({ access }) => ls.setItem('access', access);
    const eliminarTokens = () => ls.clear();
    const obtenerTokenRefresh = () => ls.getItem('refresh');
    const actualizarToken = async() => {
        try{
            const refreshToken = obtenerTokenRefresh();
            console.log('REFRESH TOKEN')
            console.log(refreshToken);
            const res = await refreshService.create({
                refresh: refreshToken
            })
            const { data } = await res;
            console.log('TOKEN DE ACTUALIZACION');
            console.log(data);
            reemplazarTokenAccess(data);
        }catch({ response: { status } }){
            if(status === 401){
                eliminarTokens();
                clearInterval(referenciaRefresh.value);
                autenticado.value = false;
                router.push({
                    name: 'login'
                });
            }
        }
    };
    const verificarAutenticacion = () => {
        autenticado.value = (!!localStorage.getItem('access') && !!localStorage.getItem('refresh'));
    };

    return {
        autenticado,
        referenciaRefresh,
        actualizarToken,
        verificarAutenticacion
    }
});