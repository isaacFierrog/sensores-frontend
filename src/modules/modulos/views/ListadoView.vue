<template>
    <div>
        <h1 class="titulo">Modulos</h1>
        <button class="boton-crear blanco-a" @click="mostrarFormulario">
            <i class="fa-solid fa-plus"></i>
            Crear modulo
        </button>
        <ModuloForm
            :mostrarForm="mostrarForm"
            @ocultarFormulario="mostrarFormulario"
            @refrescarModulos="refrescarModulos">
        </ModuloForm>
        <section class="modulos">
            <Modulo 
                v-for="modulo in modulos"
                :key="modulo.id"
                :modulo="modulo"
                @click="verDetallesModulo(modulo.id)">
            </Modulo>
        </section>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import modulosServicio from '../../services/modulosServicio.js';
import { Bar } from 'vue-chartjs'

export default {
    components: {
        ModuloForm: defineAsyncComponent(
            () => import('../components/ModuloForm.vue')
        ),
        Modulo: defineAsyncComponent(
            () => import('../components/ModuloComponent.vue')
        )
    },
    created() {
        this.obtenerModulos();
    },
    data() {
        return {
            modulos: [],
            mostrarForm: true
        }
    },
    methods: {
        verDetallesModulo(idModulo){
            console.log(`Este es el modulo: ${idModulo}`);
            this.$router.push({
                name: 'modulos-detalle',
                params: {
                    id: idModulo
                }
            })
        },
        async obtenerModulos() {
            try{
                const res = await modulosServicio.get();
                const data = await res.data;
                const { status, statusText } = res;

                if(status < 200 || status > 299) throw { status, statusText };

                this.modulos = data;
            }catch({ status, statusText }){
                const mensaje = statusText || 'Ocurrio un error';
                console.log({ mensaje, status });
            }
        },
        refrescarModulos() {
            console.log('REFRESCANDO MODULOS')
            this.obtenerModulos();
        },
        mostrarFormulario() {
            this.mostrarForm = !this.mostrarForm;
        }
    }
}
</script>
    
<style scoped>
    .modulos{
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
</style>