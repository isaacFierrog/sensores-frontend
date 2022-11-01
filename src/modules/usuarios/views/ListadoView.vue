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
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import usuariosServicio from '../../services/usuariosServicio.js';

export default {
    components: {
        UsuarioForm: defineAsyncComponent(
            () => import('../components/UsuarioForm.vue')
        ),
        Usuario: defineAsyncComponent(
            () => import('../components/UsuarioComponent.vue')
        )
    },
    created() {
        this.mostrarUsuarios();
    },
    data() {
        return {
            usuarios: [],
            mostrarForm: true,
            usuarioEditar: null
        }
    },
    methods: {
        async mostrarUsuarios() {
            try{
                const res = await usuariosServicio.get();
                const data = await res.data;
                const { status, statusText } = res;

                if(status < 200 || status > 299) throw { status, statusText };

                this.usuarios = data;
            }catch({ status, statusText }){
                const mensaje = statusText || 'Ocurrio un error';
                console.log({ mensaje, status });
            }
        },
        mostrarFormulario() {
            this.mostrarForm = !this.mostrarForm;
        },
        editarUsuario(usuario){
            // this.usuarioEditar = usuario;
            this.usuarioEditar = usuario;
            this.mostrarFormulario();
        }
    }
}
</script>