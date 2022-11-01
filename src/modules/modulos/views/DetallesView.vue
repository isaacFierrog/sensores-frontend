<template>
    <div>
        <h1>Detalles del modulo</h1>
        <article>
            <h3>Modulo: {{ modulo.mac }}</h3>
            <p>Zona: {{ modulo.area }}</p>
            <p>Mina: {{ modulo.mina }}</p>
            <ul>
                <li v-for="sensor in modulo.sensores">
                    <p>Clave: {{ sensor.clave }}</p>
                    <ul>
                        <li v-for="dato in sensor.datos">
                            <p>----Estado: {{ dato.estado }}</p>
                            <p>----Valor: {{ dato.valor }}</p>
                        </li>
                    </ul>
                </li>
            </ul>
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
    }
}
</script>