<template>
    <div class="layout-login">
        <h2 class="titulo-vista blanco-a">Inicio de sesion</h2>
        <form 
            @submit.prevent="autenticarUsuario"
            class="form">
            <p class="blanco-a form__label">CORREO</p>
            <input 
                type="text" 
                placeholder="Correo de usuario"
                v-model="correo"
                class="form__input">
            <p class="blanco-a form__label">CONTRASEÑA</p>
            <input 
                type="password" 
                placeholder="Password de usuario"
                v-model="password"
                class="form__input">
            <input 
                type="submit" 
                value="Ingresar"
                class="form__submit blanco-a txt-upper">
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const ls = localStorage;

export default {
    data(){
        return {
            correo: '',
            password: ''
        }
    },
    methods: {
        guardarTokens({ access, refresh }){
            ls.setItem('access', access);
            ls.setItem('refresh', refresh);
        },
        reiniciarCampos() {
            this.correo = '';
            this.password = '';
        },
        autenticarUsuario() {
            if(this.campoCorreoVacio || this.campoPasswordVacio){
                console.log('Debes de llenar todos los campos para ingresar');
                return;
            }
            this.autenticar({
                correo: this.correo,
                password: this.password
            });
            this.reiniciarCampos();
            this.redireccionar();
        },
        redireccionar(){
            if(this.estaAutenticado){
                console.log('Hola');
                this.$router.push({ name: 'usuarios-listar' });
            }
        },
        ...mapActions({
            autenticar: 'autenticarUsuario'
        })
    },
    computed: {
        campoCorreoVacio() {
            return this.correo.length === 0;
        },
        campoPasswordVacio() {
            return this.password.length === 0;
        },
        ...mapGetters(['estaAutenticado'])
    }
}
</script>

<style scoped>
    .layout-login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
</style>