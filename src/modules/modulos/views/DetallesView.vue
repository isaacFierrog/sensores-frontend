<template>
    <div>
        <h1>Detalles del modulo</h1>
        <article v-if="moduloCargado">
            <h3>Modulo: {{ modulo.mac }}</h3>
            <p>Zona: {{ modulo.area }}</p>
            <p>Mina: {{ modulo.mina }}</p>
            <section class="sensores" v-if="sensoresCargados">
                <article v-for="sensor in modulo.sensores"
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
import { defineAsyncComponent } from 'vue'; 
import modulosServicio from '../../services/modulosServicio.js';

export default {
    created(){
        this.obtenerDatosModulo();
        this.referenciaPeticion = setInterval(() => {
            this.obtenerDatosModulo();
        }, this.tiempoPeticion);
    },
    beforeUnmount(){
        this.detenerPeticion();
    },
    data(){
        return {
            modulo: null,
            referenciaPeticion: null,
            tiempoPeticion: 5000,
        }
    },
    methods: {
        detenerPeticion() {
            clearInterval(this.referenciaPeticion);
            this.referenciaPeticion = null;
        },
        async obtenerDatosModulo() {
            try{
                const { id } = this.$route.params;
                const res = await modulosServicio.retrieve(id);
                const data = await res.data;
                const { status, statusText } = res;
                
                console.log('DATA');
                console.log(data);

                if(status < 200 || status > 299) throw { status, statusText };

                this.modulo = data;
            }catch({ status, statusText }){
                const mensaje = statusText || 'Ocurrio un error';
                console.log({ mensaje, status });
            }
        }
    },
    computed: {
        moduloCargado() {
            return this.modulo != null;
        },
        sensoresCargados() {
            return this.modulo.sensores.length > 0;
        },
        sensores() {
            return this.modulo.sensores;
        },
        ultimoValor(){
            return datos => {
                if(datos.length === 0) return 'N/E';
                return datos.pop().valor;
            }
        },
        estadoSensor(){
            return datos => {
                if(datos.length === 0) return 'S/E'; 
                return datos.pop().estado
                    ? 'sensor--activo'
                    : 'sensor--inactivo'
            }
        }
    }
}
</script>

<style scoped>
    .sensores{
        display: flex;
        flex-wrap: nowrap;
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
</style>