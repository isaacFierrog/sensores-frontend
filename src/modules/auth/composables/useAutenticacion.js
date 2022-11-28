import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/useMainStore'

const useAutenticacion = () => {
    //Instancias
    const router = useRouter();
    const store = useMainStore();

    //Propiedades
    const correo = ref('');
    const password = ref('');
    const mostrarAlertas = ref(false);
    const credencialesInvalidas = ref(false);
    const { errorAutenticacion } = storeToRefs(store);

    //Metodos
    const { autenticarUsuario } = store;
    const reiniciarCampos = () => {
        correo.value = '';
        password.value = '';
    }
    const autenticar = () => {
        credencialesInvalidas.value = false;
        mostrarAlertas.value = false;

        if(camposVacios.value){
            mostrarAlertas.value = true;
            return;
        }

        autenticarUsuario({ correo: correo.value, password: password.value });
        reiniciarCampos();
        if(errorAutenticacion.value) credencialesInvalidas.value = true;
    }

    //Propiedades computadas
    const camposVacios = computed(() => !correo.value.length || !password.value.length);
    const inputVacio = computed(() => ({ 'form__input--vacio': mostrarAlertas.value }));

    return {
        //Propiedades
        correo,
        password, 
        mostrarAlertas,
        credencialesInvalidas,

        //Propiedades computadas
        camposVacios,
        inputVacio,

        //Metodos
        autenticar
    }
};

export default useAutenticacion;