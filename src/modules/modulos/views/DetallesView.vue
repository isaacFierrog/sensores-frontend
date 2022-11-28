<template>
    <div>
        <article class="modulo" v-if="modulo">
            <section class="info">
                <h1 class="info__titulo">{{ modulo.mac }}</h1>
                <section>
                    <p class="info__zona">Zona: {{ modulo.area }}</p>
                    <p class="info__mina">Mina: {{ modulo.mina }}</p>
                </section>
            </section>
            <hr>
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
        <!-- <hr> -->
        <template v-if="datos.length">
            <section class="grafica">
                <h2>Grafica de datos</h2>
                <Grafica :datos="datos"></Grafica>
            </section>
        </template>
        <h2 v-else>No hay datos disponibles</h2>

    </div>
</template>

<script>
import { onBeforeUnmount, ref, toRefs, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import modulosService from '@/services/modulosService'


export default {
    components: {
        Grafica: defineAsyncComponent(
            () => import('../components/Grafica.vue')
        )
    },
    setup(){
        const route = useRoute();
        const { params } = toRefs(route);

        //Propiedades
        const modulo = ref(null);
        const referenciaPeticion = ref(null);
        const tiempoPeticion = 20000;
        const datos = ref(null)

        //Metodos
        const obtenerArregloMayor = sensores => Math.max(...sensores.map(sensor => sensor.datos.length));
        const igualarLongitudArreglos = (sensores, numMaxDatos) => {
            return sensores.map(sensor => {
                while(sensor.datos.length < numMaxDatos)
                    sensor.datos.push({ valor: 0 });
                return sensor;
            })
        }
        const detenerPeticion = () => {
            clearInterval(referenciaPeticion.value);
            referenciaPeticion.value = null;
        }
        const obtenerDatosModulo = async() => {
            try{
                const res = await modulosService.retrieve(params.value.id);
                const data = await res.data;

                const numeroMaxDatos = obtenerArregloMayor(data.sensores);
                console.log(igualarLongitudArreglos(data.sensores, numeroMaxDatos))
                modulo.value = data;
                datos.value = data.sensores.map(sensor => {
                    return {
                        name: sensor.clave,
                        data: sensor.datos.map(dato => dato.valor).reverse()
                    }   
                });

                console.log(data)
                console.log('DATOS PARA GRAFICAR');
                console.log(datos.value);
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
            ultimoValor, 
            datos
        }
    }
}
</script>

<style scoped>
    .modulo{
        margin-bottom: 2rem;
    }
    .info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .info__titulo{
        margin-right: 1rem;
        font-size: 4.8rem;
    }
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
    .grafica{
        margin-top: 2rem;
    }
</style>