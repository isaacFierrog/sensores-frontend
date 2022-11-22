<template>
    <div>
        <h1 class="titulo">Modulos</h1>
        <button 
            class="boton-crear blanco-a" 
            @click="mostrarFormulario">
            <i class="fa-solid fa-plus"></i>
            Crear modulo
        </button>
        <ModuloForm
            :verFormulario="verFormulario"
            @ocultarFormulario="mostrarFormulario"
            @refrescarModulos="refrescarModulos"/>
        <section class="modulos" v-if="modulos">
            <Modulo 
                v-for="modulo in modulos"
                :key="modulo.id"
                :modulo="modulo"
                @click="verDetallesModulo(modulo.id)"/>
        </section>
        <section class="botones">
            <button 
                :disabled="!paginaAnterior"
                class="boton"
                @click="regresarPagina">
                Anterior
            </button>
            <button 
                :disabled="!paginaSiguiente"
                class="boton"
                @click="cambiarPagina">
                Siguiente
            </button>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router'
import modulosService from '@/services/modulosService'

export default {
    components: {
        Modulo: defineAsyncComponent(
            () => import('../components/ModuloComponent.vue')
        ),
        ModuloForm: defineAsyncComponent(
            () => import('../components/ModuloForm.vue')
        )
    },
    setup() {
        const router = useRouter();

        //Propiedades
        const modulos = ref([]);
        const verFormulario = ref(false);
        const paginaAnterior = ref(null);
        const paginaSiguiente = ref(null);
        let numeroPagina = 1;

        //Metodos
        const mostrarFormulario = () => verFormulario.value = !verFormulario.value;
        const obtenerModulos = async() => {
            try{
                const res = await modulosService.list(numeroPagina);
                const data = await res.data;
                const { results, next, previous } = data;
                modulos.value = results;
                paginaAnterior.value = !!previous;
                paginaSiguiente.value = !!next;
            }catch({ response }){
                if(response.status === 401){
                    console.log('refrescar token');
                    console.log(response.status);
                }
            }
        };
        const refrescarModulos = () => obtenerModulos();
        const verDetallesModulo = idModulo => {
            router.push({
                name: 'modulos-detalle',
                params: {
                    id: idModulo
                }
            })
        };
        const cambiarPagina = () => {
            numeroPagina++;
            obtenerModulos();
        };
        const regresarPagina = () => {
            numeroPagina--;
            obtenerModulos();
        }   

        obtenerModulos();

        return {
            modulos,
            verFormulario,
            paginaAnterior,
            paginaSiguiente,
            mostrarFormulario,
            refrescarModulos,
            verDetallesModulo,
            cambiarPagina,
            regresarPagina
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
    .botones{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .boton{
        padding: 1rem 2rem;
        border: none;
        border-radius: .4rem;
        color: white;
        background-color: rgb(108, 59, 165);
    }
    .boton:hover{
        cursor: pointer;
        background-color: rgb(84, 47, 126);
    }
</style>