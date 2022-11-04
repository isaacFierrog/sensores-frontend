import { createStore } from "vuex";
import autenticacionServicio from "../modules/services/autenticacionServicio";
import refreshServicio from '../modules/services/refreshServicio';


const ls = localStorage;
const guardarToken = ({ token, refresh }) => {
    ls.setItem('token', token);
    ls.setItem('refresh', refresh);
}
const obtenerRefreshToken = () => {
    return ls.getItem('refresh');
}

export default createStore({
    state: {
        autenticado: false,
        procesando: false,
        usuario: null, 
        refRefrescarToken: null,
        tiempoRefresh: 10000
    },
    mutations: {
        guardarToken(state, { token, refresh, usuario }) {
            state.usuario = usuario;
            guardarToken({ token, refresh });
        },
        autenticar(state){
            state.autenticado = true;

        },
        validarProcesado(state, estado){
            state.procesando = estado;
        },
        validarAutenticacion(state){

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
    
                if(status < 200 || status > 299) throw { status, statusText };
        
                context.commit('guardarToken', data);
                context.commit('autenticar');
                context.commit('validarProcesado', false);
                context.state.refRefrescarToken = setInterval(() => {
                    context.dispatch('refrescarToken');
                }, context.state.tiempoRefresh);
            }catch({ status, statusText }){
                console.log('Desde la excepcion')
                console.log(status, statusText);
            }

        }
    },
    getters: {

    }
});