import { ref } from 'vue'
import { defineStore } from 'pinia'
import authService from '../../../services/authService';


const ls = localStorage;


export default defineStore('autenticacion', () => {
    //State
    const accessToken = ref(ls.getItem('access'));
    const usuarioAutenticado = ref(
        JSON.parse(ls.getItem('usuario'))
    );
    const refRenovarToken = ref(null);
    const tiempoActualizacion = ref(900000);

    //Actions
    const guardarDatos = data => {
        const {
            access,
            refresh,
            usuario
        } = data;

        accessToken.value = access;
        usuarioAutenticado.value = { ...usuario };

        ls.setItem('access', access);
        ls.setItem('refresh', refresh);
        ls.setItem('usuario', JSON.stringify(usuario));
    };
    const limpiarDatos = () => {
        accessToken.value = '';
        usuarioAutenticado.value = null;
        refRenovarToken.value = null;
        ls.clear();
    }
    const actualizarToken = ({ access, refresh }) => {
        ls.setItem('access', access);
        ls.setItem('refresh', refresh);
    };
    const renovarToken = async() => {
        try{
            const res = await authService.refresh({
                refresh: ls.getItem('refresh')
            });
            const data = await res.data;

            console.log(data);
            actualizarToken(data);
        }catch(err){
            console.log(err);
        }
    }

    return {
        //state
        accessToken,
        refRenovarToken,
        usuarioAutenticado,
        tiempoActualizacion,

        //actions
        guardarDatos,
        limpiarDatos,
        renovarToken,
    }
});