import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import authService from '@/services/authService' 
import useAuthStore from '@/store/useAuthStore';

const TIEMPO_REFRESH = 420000;

const useAutenticacion = () => {
    const router = useRouter();
    const store = useAuthStore();

    //Propiedades
    const correo = ref('');
    const password = ref('');
    const mostrarAlertas = ref(false);
    const credencialesInvalidas = ref(false);
    const mostrarCarga = ref(false);
    const { 
        referenciaRefresh,
        autenticado
    } = storeToRefs(store);

    //Metodos
    const { actualizarToken } = store;
    const reiniciarCampos = () => {
        correo.value = '';
        password.value = '';
    }
    const guardarEnLocalStorage = ({ refresh, access, usuario }) => {
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('access', access);
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    const autenticarUsuario = async() => {
        if(camposVacios.value){
            credencialesInvalidas.value = false;
            mostrarAlertas.value = true;
            return;
        }
        mostrarAlertas.value = false;
        mostrarCarga.value = true;

        try{
            const res = await authService.create({
                correo: correo.value,
                password: password.value
            });
            const data = await res.data;
            reiniciarCampos();
            guardarEnLocalStorage(data);
            referenciaRefresh.value = setInterval(() => actualizarToken(), TIEMPO_REFRESH);
            mostrarCarga.value = false;
            credencialesInvalidas.value = false;
            autenticado.value = true;
            router.push({ name: 'modulos-listar' });
        }catch(err){
            reiniciarCampos();
            mostrarCarga.value = false;
            credencialesInvalidas.value = true;
        }
    };

    //Propiedades computadas
    const camposVacios = computed(() => {
        return !correo.value.length || !password.value.length;
    });
    const inputVacio = computed(() => {
        return { 'form__input--vacio': mostrarAlertas.value }
    })

    return {
        correo,
        password, 
        mostrarAlertas,
        mostrarCarga,
        credencialesInvalidas,
        camposVacios,
        inputVacio,
        autenticarUsuario
    }
};

export default useAutenticacion;