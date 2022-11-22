<template>
    <div>
        <h1>Usuarios</h1>
        <button class="boton-crear blanco-a" @click="mostrarFormulario">
            <i class="fa-solid fa-plus"></i>
            Crear usuario
        </button>
        <Usuario
            v-for="usuario in usuarios"
            :usuario="usuario" 
            :key="usuario"
            @editarUsuario="editarUsuario">
        </Usuario>
        <UsuarioForm 
            :mostrarForm="mostrarForm"
            :usuario="usuarioEditar"
            @ocultarFormulario="mostrarFormulario"
            @actualizarUsuarios="mostrarUsuarios">
        </UsuarioForm>
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
// import usuariosServicio from '../../services/usuariosServicio.js';
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue';
import usuariosService from '@/services/usuariosService'

export default {
    components: {
        UsuarioForm: defineAsyncComponent(
            () => import('../components/UsuarioForm.vue')
        ),
        Usuario: defineAsyncComponent(
            () => import('../components/UsuarioComponent.vue')
        )
    },
    setup() {
        //Propiedades
        const usuarios = ref(null);
        const mostrarForm = ref(true);
        const usuarioEditar = ref(null);
        const paginaAnterior = ref(null);
        const paginaSiguiente = ref(null);
        const numeroPagina = 1;

        //Metodos
        const mostrarUsuarios = async() => {
            try{
                const res = await usuariosService.list();
                const data = await res.data;
                const { results, previous, next } = data;
                usuarios.value = results;
                paginaAnterior.value = !!previous;
                paginaSiguiente.value = !!next;

                console.log(data)
            }catch(err){
                console.log(err);
            }
        }
        const mostrarFormulario = () => mostrarForm.value = !mostrarForm.value;
        const cambiarPagina = () => {
            numeroPagina++;
            mostrarUsuarios();
        };
        const regresarPagina = () => {
            numeroPagina--;
            mostrarUsuarios();
        };


        mostrarUsuarios();
        return {
            usuarios,
            mostrarForm,
            usuarioEditar,
            paginaAnterior,
            paginaSiguiente,
            mostrarFormulario,
            cambiarPagina,
            regresarPagina
        }
    }
}
// export default {
//     components: {
//         UsuarioForm: defineAsyncComponent(
//             () => import('../components/UsuarioForm.vue')
//         ),
//         Usuario: defineAsyncComponent(
//             () => import('../components/UsuarioComponent.vue')
//         )
//     },
//     created() {
//         this.mostrarUsuarios();
//     },
//     data() {
//         return {
//             usuarios: [],
//             mostrarForm: true,
//             usuarioEditar: null
//         }
//     },
//     methods: {
//         async mostrarUsuarios() {
//             try{
//                 const res = await usuariosServicio.get();
//                 const data = await res.data;
//                 const { status, statusText } = res;

//                 if(status < 200 || status > 299) throw { status, statusText };

//                 this.usuarios = data;
//             }catch({ status, statusText }){
//                 const mensaje = statusText || 'Ocurrio un error';
//                 console.log({ mensaje, status });
//             }
//         },
//         mostrarFormulario() {
//             this.mostrarForm = !this.mostrarForm;
//         },
//         editarUsuario(usuario){
//             // this.usuarioEditar = usuario;
//             this.usuarioEditar = usuario;
//             this.mostrarFormulario();
//         }
//     }
// }
</script>

<style scoped>
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