<template>
    <div class="layout-login">
        <Loader v-if="mostrarCarga"/>
        <h2 class="titulo-vista blanco-a">Inicio de sesion</h2>
        <form 
            @submit.prevent="autenticar"
            class="form">
            <p class="blanco-a form__label">CORREO</p>
            <input 
                type="text" 
                placeholder="Correo de usuario"
                v-model="correo"
                class="form__input"
                :class="inputVacio">
            <p class="blanco-a form__label">CONTRASEÑA</p>
            <input 
                type="password" 
                placeholder="Password de usuario"
                v-model="password"
                class="form__input"
                :class="inputVacio">
            <input 
                type="submit" 
                value="Ingresar"
                class="form__submit blanco-a txt-upper">
            <p 
                v-if="mostrarAlertas"
                class="mensaje--error">
                Debe de llenar todos los campos
            </p>
            <p
                v-if="credencialesInvalidas"
                class="mensaje--error">
                Las credencias son invalidas
            </p>
        </form>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useAutenticacion from '../composables/useAutenticacion'

export default {
    components: {
        Loader: defineAsyncComponent(
            () => import('../../shared/components/LoaderComponent.vue')
        )
    },
    setup(){    
        const {  
            correo,
            password, 
            mostrarAlertas,
            mostrarCarga,
            credencialesInvalidas,
            camposVacios,
            inputVacio,
            autenticar
        } = useAutenticacion();

        return {
            correo,
            password, 
            mostrarAlertas,
            mostrarCarga,
            credencialesInvalidas,
            camposVacios,
            inputVacio,
            autenticar
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
    .form{
        max-width: 90%;
    }
    .form__input{
        padding: 1.5rem;
        font-size: 1.7rem;
    }
    .form__input--vacio{
        border: .3rem solid rgb(243, 56, 56);
    }
    .form__submit{
        height: 5rem;
    }
    .mensaje--error{
        margin-top: 1.5rem;
        color: red;
        text-align: center;
        font-weight: bold;
    }

    @media screen and (min-width: 768px){
        .form{
            max-width: 50rem;
        }
    }
</style>