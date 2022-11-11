import { createStore } from "vuex";
import autenticacionServicio from "../modules/services/autenticacionServicio";
import refreshServicio from '../modules/services/refreshServicio';


const ls = localStorage;
const guardarTokenLocal = ({ access, refresh }) => {
    ls.setItem('access', access);
    ls.setItem('refresh', refresh);
};
const obtenerRefreshToken = () => ls.getItem('refresh');
const actualizarToken = ({ access }) => ls.setItem('access', access)

export default createStore({
    state: {
        autenticado: false,
        procesando: false,
        refRefrescarToken: null,
        tiempoRefresh: 10000
    },
    mutations: {
        guardarToken(state, { access, refresh }) {
            console.log('HOLA DESDE GUARDAR TOKEN');
            console.log({ access, refresh });
            guardarTokenLocal({ access, refresh });
        },
        guardarReferenciaToken(state, ref) {
            state.refRefrescarToken = ref;
        },
        validarProcesado(state, estado){
            state.procesando = estado;
        },
        validarAutenticacion(state, estado){
            state.autenticado = estado;
        }
    },
    actions: {
        async refrescarToken(context){
            try{
                const refresh = obtenerRefreshToken();
                const res = await refreshServicio.post({ refresh });
                const data = await res.data;
                const { status, statusText } = res;
    
                if(status < 200 || status > 299) throw { status, statusText };

                console.log(data);
                actualizarToken(data);
            }catch({ status, statusText }){
                console.log('Desde la excepcion')
                console.log(status, statusText);
            }
        },
        async autenticarUsuario(context, { correo, password }) {
            try{
                context.commit('validarProcesado', true);
                const res = await autenticacionServicio.post({ correo, password });
                const data = await res.data;
                const { status, statusText } = res;
    
                if(status < 200 && status > 299) throw { status, statusText };
                
                context.commit('guardarToken', data);
                context.commit('validarProcesado', false);
                context.commit('validarAutenticacion', true);
            }catch({ status, statusText }){
                alert('Las credenciales introducidas son incorrectas');
                context.commit('validarProcesado', false);
                context.commit('validarAutenticacion', false);
            }

        }
    },
    getters: {
        estaAutenticado(state) {
            state.autenticado = (ls.getItem('refresh')) ? true : false;
            return state.autenticado;
        }
    }
});