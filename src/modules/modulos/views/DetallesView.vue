<template>
    <div>
        <h1>Detalles del modulo</h1>
        <article v-if="modulo">
            <h3>Modulo: {{ modulo.mac }}</h3>
            <p>Zona: {{ modulo.area }}</p>
            <p>Mina: {{ modulo.mina }}</p>
            <section class="sensores" v-if="sensores">
                <article v-for="sensor in sensores"
                    class="sensor"
                    :class="estadoSensor(sensor.datos)"
                    :key="sensor">
                    <p class="sensor__clave">{{ sensor.clave }}</p>
                    <hr>
                    <p>Ultimo valor: {{ ultimoValor(sensor.datos) }}</p>
                </article>
            </section>
        </article>
    </div>
</template>

<script>
import { onBeforeUnmount, ref, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
import modulosService from '@/services/modulosService'


export default {
    setup(){
        const route = useRoute();
        const { params } = toRefs(route);

        //Propiedades
        const modulo = ref(null);
        const referenciaPeticion = ref(null);
        const tiempoPeticion = 20000;

        //Metodos
        const detenerPeticion = () => {
            clearInterval(referenciaPeticion.value);
            referenciaPeticion.value = null;
        }
        const obtenerDatosModulo = async() => {
            try{
                const res = await modulosService.retrieve(params.value.id);
                const data = await res.data;

                modulo.value = data;
            }catch(err){
                console.log(err)
            }
        }

        //Propiedades computadas
        const sensores = computed(() => modulo.value.sensores || 0)
        const estadoSensor = computed(() => {
            return datos => !datos.length ? 'sensor--sinestado' : datos[0].estado
                ? 'sensor--activo'
                : 'sensor--inactivo'
        });
        const ultimoValor = computed(() => {
            return datos => !datos.length ? 'N/E' : datos[0].valor;
        });

        obtenerDatosModulo();
        referenciaPeticion.value = setInterval(() => {
            obtenerDatosModulo();
        }, tiempoPeticion);
        onBeforeUnmount(() => detenerPeticion());

        return {
            modulo,
            referenciaPeticion,
            sensores,
            estadoSensor,
            ultimoValor
        }
    }
}
</script>

<style scoped>
    .sensores{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding-top: 2rem;
    }
    .sensor{
        flex-basis: calc((100% / 4) - 1rem);
        padding: 2rem;
        background-color: #242629;
        color: #fffffe;
        border: none;
        border-radius: 1rem;
    }
    .sensor__clave{
        font-weight: bold;
    }
    .sensor--activo{
        border-right: 4rem solid rgb(68, 175, 68);
    }
    .sensor--inactivo{
        border-right: 4rem solid rgb(190, 78, 78);
    }
    .sensor--sinestado{
        border-right: 4rem solid rgb(158, 158, 158);
    }
</style>