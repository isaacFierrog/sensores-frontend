<template>
    <div class="layout-login">
        <!-- <Loader v-if="mostrarCarga"/> -->
        <h2 class="titulo-vista blanco-a">Inicio de sesion</h2>
        <form 
            @submit.prevent="autenticarUsuario"
            class="form">
            <p class="blanco-a form__label">CORREO</p>
            <input 
                type="text" 
                placeholder="Correo de usuario"
                v-model="correo"
                class="form__input"
                :class="errorCamposVacios">
            <p class="blanco-a form__label">CONTRASEÑA</p>
            <input 
                type="password" 
                placeholder="Password de usuario"
                v-model="password"
                class="form__input"
                :class="errorCamposVacios">
            <input 
                type="submit" 
                value="Ingresar"
                class="form__submit blanco-a txt-upper">
            <p 
                v-if="errorCamposVacios"
                class="mensaje--error">
                Debe de llenar todos los campos
            </p>
            <p
                v-if="errorAutenticacion"
                class="mensaje--error">
                Las credencias son invalidas
            </p>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useAuthStore from '../store/useAuthStore'
import authService from '../service/authService'

export default {
    setup(){
        //Data
        const router = useRouter();
        const authStore = useAuthStore();
        const {
            refRenovarToken,
            tiempoActualizacion
        } = storeToRefs(authStore);
        const correo = ref('');
        const password = ref('');
        const errorAutenticacion = ref(false);
        const errorCamposVacios = ref(false);

        //Metodos
        const {
            guardarDatos,
            renovarToken
        } = authStore;
        const limpiarCampos = () => {
            correo.value = '';
            password.value = '';
        };
        const validarCamposVacios = () => {
            if(!correo.value || !password.value){
                errorCamposVacios.value = true;
                return true;
            }
            return false;
        }
        const reiniciarErrores = () => {
            errorAutenticacion.value = false;
            errorCamposVacios.value = false;
        }
        const autenticarUsuario = async() => {
            reiniciarErrores();
            if(validarCamposVacios()) return;

            try{
                const res = await authService.login({
                    correo: correo.value,
                    password: password.value
                });
                const data = await res.data;

                console.log(data);

                guardarDatos(data);
                limpiarCampos();
                refRenovarToken.value = setInterval(
                    () => renovarToken(),
                    tiempoActualizacion.value
                );
                router.push({ name: 'modulos-listar' })
            }catch(err){
                errorAutenticacion.value = true;
                console.log(err);
            }
        }

        return {
            //data
            correo,
            password,
            errorAutenticacion, 
            errorCamposVacios,

            //metodos
            autenticarUsuario
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