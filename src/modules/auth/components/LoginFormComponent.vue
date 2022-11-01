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
import { list } from 'postcss';
import VueJwtDecode from 'vue-jwt-decode'

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
            console.log('Tokens almacenados');
            ls.setItem('access', access);
            ls.setItem('refresh', refresh);
        },
        reiniciarCampos() {
            this.correo = '';
            this.password = '';
        },
        async autenticarUsuario() {
            const url = 'http://127.0.0.1:8000/api/login/';

            try{
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                    },
                    body: JSON.stringify({
                        correo: this.correo,
                        password: this.password
                    })
                });
                const data = await res.json();
                const { status, statusText } = res;
                
                if(!res.ok) throw { status, statusText };
                
                this.guardarTokens(data);
                this.reiniciarCampos();
            }catch({ status, statusText }){
                const mensaje = statusText || 'Ocurrio un error';
                console.log(`Error ${status}: ${mensaje}`);
            }
        }
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