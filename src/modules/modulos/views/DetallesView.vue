<template>
    <div>
        <ModuloForm
            :modulo="modulo"
            :verFormulario="verFormulario"
            @ocultarFormulario="ocultarFormulario"
            @refrescarModulos="refrescarModulos">
        </ModuloForm>
        <article class="modulo" v-if="modulo">
            <section class="info">
                <div class="info__wrapper">
                    <h1 class="info__titulo">{{ modulo.mac }}</h1>
                    <section>
                        <p class="info__zona">Area: {{ modulo.area }}</p>
                        <p class="info__mina">Mina: {{ modulo.mina }}</p>
                    </section>
                </div>
                <section class="acciones">
                    <i 
                        class="fa-solid fa-trash acciones__icono"
                        @click="eliminarModulo">
                    </i>
                    <i 
                        class="fa-solid fa-pen-to-square acciones__icono" 
                        @click="editarModulo">
                    </i>
                </section>
            </section>
            <!-- <hr> -->
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

        <section class="grafica">
            <h2>Grafica de datos</h2>
            <Grafica 
                :datos="datos"
                :tiempo="lineaTiempo"
                >
            </Grafica>
        </section>

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
        ),
        ModuloForm: defineAsyncComponent(
            () => import('../components/ModuloForm.vue')
        )
    },
    setup(){
        const route = useRoute();
        const { params: { id } } = route;

        //Propiedades
        const modulo = ref(null);
        const referenciaPeticion = ref(null);
        const tiempoPeticion = 20000;
        const datos = ref(null)
        const verFormulario = ref(false);
        const lineaTiempo = ref([]);

        // const tiempo = [];


        //Metodos
        const refrescarModulos = () => obtenerDatosModulo();;
        const ocultarFormulario = () => verFormulario.value = false;
        const editarModulo = () => verFormulario.value = true;
        const eliminarModulo = () => {
            console.log('Eliminar modulo');
        };
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

        const obtenerLineaTiempo = (arregloTiempo) => {
            console.log('OBTENER LINEA TIEMPO');
            console.log(arregloTiempo)
            return 1
        };

        const obtenerDatosModulo = async() => {
            try{
                const res = await modulosService.retrieve(id);
                const data = await res.data;

                console.log('Valores iniciales');
                console.log(data);

                const numeroMaxDatos = obtenerArregloMayor(data.sensores);
                console.log(igualarLongitudArreglos(data.sensores, numeroMaxDatos))
                modulo.value = data;
                // datos.value = data.sensores.map(sensor => {
                //     return {
                //         name: sensor.clave,
                //         data: sensor.datos 
                //             ? sensor.datos.map(dato => dato.valor).reverse()
                //             : [0]
                //     }   
                // });


                

                datos.value = data.sensores.map(sensor => {
                    return {
                        name: sensor.clave,
                        data: sensor.datos.map(dato => dato.valor).reverse()
                    }
                })
                
                //LOGICA LINEA DE TIEMPO
                const arregloTiempo = data.sensores.map(sensor => {
                    return sensor.datos.map(dato => (dato.fecha_creacion)
                        ? new Date(dato.fecha_creacion).getHours()
                        : 0    
                    );
                }).flat();
                const rangoSuperior = Math.max(...arregloTiempo);

                for(let i=0; i<=rangoSuperior; i++){
                    lineaTiempo.value.push(i);
                }

                
                const datosSensor = data.sensores.map(sensor => ({
                    name: sensor.clave,
                    data: lineaTiempo.value.map(tiempo => {
                        let valorInicial = 0;
                        for(let i = 0; i < sensor.datos.length; i++){
                            const horasDato = new Date(sensor.datos[i].fecha_creacion).getHours() || 0;
                            if(horasDato === tiempo){
                                console.log(sensor.datos[i].valor);
                                valorInicial = sensor.datos[i].valor;
                                return valorInicial;
                            }else{
                                return valorInicial;
                            }
                        }
                    })
                }));

                console.log('ARREGLO TIEMP');
                console.log(arregloTiempo);

                console.log('RANGO SUPERIOR');
                console.log(rangoSuperior);

                console.log('LINEA DE TIEMPO');
                console.log(lineaTiempo.value);
                console.log(lineaTiempo.value.length);

                console.log('DATOS SENSOR');
                console.log(datosSensor);
                // console.log(obtenerLineaTiempo(arregloTiempo));


                // console.log('TIEMPO');
                // console.log(Math.max(...arregloTiempo.value));

                console.log('FECHA CREACION')
                console.log(new Date(data.fecha_creacion).getHours())

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
            //Propiedades
            modulo,
            referenciaPeticion,
            sensores,
            estadoSensor,
            ultimoValor, 
            datos,
            verFormulario,
            lineaTiempo,
            // tiempo,

            //Metodos
            eliminarModulo,
            editarModulo,
            ocultarFormulario,
            refrescarModulos
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
        justify-content: space-between;
        align-items: center;
    }
    .info__wrapper{
        display: flex;
        justify-content: center;
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
    .acciones{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 8%;
    }
    .acciones__icono{
        padding: 1rem;
        font-size: 2.5rem;
    }
    .acciones__icono:hover{
        cursor: pointer;
        border-bottom: .1rem solid rgb(221, 108, 108);
    }
</style>