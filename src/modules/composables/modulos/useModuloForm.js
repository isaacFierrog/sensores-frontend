import { ref, computed, watch, toRefs } from 'vue'
import modulosServicio from '../../services/modulosServicio';

export default (props, { emit }) => {
    //Propiedades
    const { verFormulario, modulo } = toRefs(props);
    const mac = ref('');
    const mina = ref('');
    const area = ref('');
    const sensores = ref([]);
    const numeroSensores = ref(0);
    const mensajeSensores = ref(false);
    const mensajeExito = ref(false);
    const mensajeError = ref(false);
    const mensajeCampos = ref(false);
    const minas = ref([
        'HERMOSILLO',
        'CANANEA'
    ]);
    const areas = ref(['A', 'B', 'C', 'D']);

    //Metodos
    const cargarValoresEdicion = () => {
        if(!modulo.value) return;
        mac.value = modulo.value.mac;
        mina.value = modulo.value.mina;
        area.value = modulo.value.area;
        sensores.value = modulo.value.sensores.map(sensor => ({
            clave: sensor.clave
        }))
        numeroSensores.value = sensores.value.length;
    };
    const refrescarModulos = () => emit('refrescarModulos');
    const reiniciarCampos = () => {
        mac.value = '';
        mina.value = '';
        area.value = '';
        sensores.value = [];
    };
    const ocultarMensajes = () => {
        mensajeCampos.value = false;
        mensajeError.value = false;
        mensajeExito.value = false;
        mensajeSensores.value = false;
    };
    const ocultarFormulario = () => {
        reiniciarCampos();
        ocultarMensajes();
        emit('ocultarFormulario');
    }
    const agregarSensores = () => {
        if(!botonHabilitado.value){
            ocultarMensajes();
            mensajeSensores.value = true;
            return
        }
        ocultarMensajes();
        numeroSensores.value++;
        const nuevoSensor = { clave: `${mac.value.toUpperCase()}-${numeroSensores.value}` };
        sensores.value.push(nuevoSensor);
    };
    const eliminarSensores = () => {
        if(numeroSensores.value === 0) return; 
        numeroSensores.value--;
        sensores.value.pop();
    };
    const crearModulo = async() => {
        ocultarMensajes();
        if(!camposLlenos.value){
            mensajeCampos.value = true;
            return;
        }

        try{
            let res = null;
            if(modulo.value){
                res = await modulosServicio.update(modulo.value.id, {
                    mac: mac.value.toUpperCase(),
                    mina: mina.value.toUpperCase(),
                    area: area.value.toUpperCase(),
                    sensores: sensores.value
                });
            }else{
                res = await modulosServicio.create({
                    mac: mac.value.toUpperCase(),
                    mina: mina.value.toUpperCase(),
                    area: area.value.toUpperCase(),
                    sensores: sensores.value
                });
            }
            const { data } = await res;
            refrescarModulos();
            reiniciarCampos()
            mensajeExito.value = true;
        }catch(err){
            mensajeError.value = true;
        }
    };

    //Propiedades computadas
    const mostrarFormulario = computed(() => ({
        'ocultar-layout': !verFormulario.value
    }));
    const botonHabilitado = computed(() => !!mac.value.length);
    const camposLlenos = computed(() => {
        return !!mac.value.length && !!mina.value.length && !!area.value.length;
    });

    cargarValoresEdicion();
    watch(mac, (newValue, oldValue) => {
        let contador = 1;
        if(!newValue.length) numeroSensores.value = 0;
        sensores.value = sensores.value.map(() => {
            const clave = `${newValue.toUpperCase()}-${contador}`;
            contador++;
            return { clave };
        })

    });
    watch(verFormulario, () => cargarValoresEdicion());
    
    return {
        verFormulario,
        mac,
        mina, 
        area,
        sensores,
        numeroSensores,
        mensajeSensores,
        mensajeExito,
        mensajeError,
        mensajeCampos,
        minas,
        areas,

        //Propiedades computadas
        mostrarFormulario,
        crearModulo,
        ocultarFormulario,
        agregarSensores,
        eliminarSensores, 
    }
};