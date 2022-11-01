<template>
    <div>
        <h1>Detalles del modulo</h1>
        <article>
            <h3>Modulo: {{ modulo.mac }}</h3>
            <p>Zona: {{ modulo.area }}</p>
            <p>Mina: {{ modulo.mina }}</p>
            <section class="sensores" v-if="modulo">
                <article v-for="sensor in modulo.sensores"
                        class="sensor"
                        :class="estadoSensor(sensor.datos)"
                        :key="sensor">
                        <p>{{ sensor.clave }}: {{ ultimoValor(sensor.datos) }}</p>
                </article>
            </section>

            <!-- <ul>
                <li v-for="sensor in modulo.sensores"
                    :key="sensor">
                    <p>Clave: {{ sensor.clave }}</p>
                    <ul>
                        <li v-for="dato in sensor.datos"
                            :key="dato">
                            <p>----Estado: {{ dato.estado }}</p>
                            <p>----Valor: {{ dato.valor }}</p>
                        </li>
                    </ul>
                </li>
            </ul> -->
        </article>
    </div>
</template>

<script>
export default {
    created(){
        this.obtenerDatosModulo();
        this.referenciaPeticion = setInterval(() => {
            this.obtenerDatosModulo();
        }, this.tiempoPeticion);
    },
    beforeUnmount(){
        console.log('ADIOS CRACK');
        this.detenerPeticion();
    },
    data(){
        return {
            modulo: null,
            referenciaPeticion: null,
            tiempoPeticion: 5000,
            modulo: null
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
                const url = `http://127.0.0.1:8000/api/modulos/${id}/`;
                const res = await fetch(url);
                const data = await res.json();
                const { status, statusText } = res;

                if(!res.ok) throw { status, statusText };

                this.modulo = data;
                console.log(this.modulo);
            }catch({ status, statusText }){
                const mensaje = statusText || 'Ocurrio un error';
                console.log(`Error ${status}: ${mensaje}`);
            }
        }
    },
    computed: {
        ultimoValor(){
            return datos => datos.pop().valor
        },
        estadoSensor(){
            return datos => datos.pop().estado
                                    ? 'sensor--activo'
                                    : 'sensor--inactivo'
        }
    }
}
</script>

<style scoped>
    .sensores{
        display: flex;
        flex-wrap: nowrap;
        gap: 1rem;
    }
    .sensor{
        flex-basis: calc((100% / 4) - 1rem);
        display: flex;
        padding: 2rem;
        background-color: antiquewhite;
        border: none;
        border-radius: 1rem;
    }
    .sensor--activo{
        border-right: 4rem solid rgb(68, 175, 68);
    }
    .sensor--inactivo{
        border-right: 4rem solid rgb(190, 78, 78);
    }
</style>