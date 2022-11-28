import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import refreshService from '@/services/refreshService'
import authService from '@/services/authService'


const ls = localStorage;
const guardarTokens = ({ access, refresh }) => {
    ls.setItem('access', access);
    ls.setItem('refresh', refresh);
};
const renovarTokenAcces = ({ access }) => ls.setItem('access', access);
const eliminarTokens = () => ls.clear();
const NO_AUTORIZADO = 401;
const TIEMPO_REFRESH = 450000;


export default defineStore('main', () => {
    //Instancias
    const router = useRouter();

    //Propiedades
    const autenticado = ref(ls.getItem('refresh'));
    const refRefreshToken = ref(null);
    const procesandoSolicitud = ref(false);
    const errorAutenticacion = ref(false);

    //Metodos
    const actualizarTokenAccess = async() => {
        try{
            const res = await refreshService.create({ refresh: autenticado.value });
            const data = await res.data;
            renovarTokenAcces(data);

            if(!refRefreshToken.value){
                refRefreshToken.value = setInterval(() => {
                    console.log('2.- Se llama porque se actualiza');
                    actualizarTokenAccess()
                }, TIEMPO_REFRESH);
            }
        }catch({ response: { status, statusText } }){
            if(status === NO_AUTORIZADO){
                console.log('El token, esta caducado')
                console.log(statusText)
                procesandoSolicitud.value = false;
                autenticado.value = '';
                eliminarTokens();
                router.push({ name: 'login' });
            }
        }
    };
    const autenticarUsuario = async(usuario) => {
        try{
            procesandoSolicitud.value = true;
            const res = await authService.create(usuario);
            const data = await res.data;
            // console.log('Autenticando desde main store')
            // console.log(data);

            procesandoSolicitud.value = false;
            errorAutenticacion.value = false;
            console.log('Se autentico de forma exitosa')
            guardarTokens(data);
            autenticado.value = ls.getItem('refresh');
            refRefreshToken.value = setInterval(() => {
                // console.log('1.- Se llama porque se autentico');
                actualizarTokenAccess();
            }, TIEMPO_REFRESH)
            router.push({ name: 'modulos-listar' });
        }catch(err){
            console.log(err);
            errorAutenticacion.value = true;
            procesandoSolicitud.value = false;
        }
    }

    return { 
        //Propiedades
        autenticado,
        refRefreshToken,
        procesandoSolicitud,
        errorAutenticacion,

        //Metodos
        actualizarTokenAccess,
        autenticarUsuario
    }
});