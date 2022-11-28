<template>
    <div class="layout-usuario-form" :class="ocultarForm">
        <button class="txt-upper blanco-a titulo-usuario boton-cerrar" @click="ocultarFormulario">x</button>
        <h2 class="txt-upper blanco-a titulo-usuario">Crear usuario</h2>
        <form class="form" @submit.prevent="crearUsuario">
            <p class="blanco-a form__label">Correo</p>
            <input type="email" class="form__input" v-model="usuario.correo">
            <p class="blanco-a form__label">Nombre</p>
            <input type="text" class="form__input" v-model="usuario.nombre">
            <p class="blanco-a form__label">Apellido</p>
            <input type="text" class="form__input" v-model="usuario.apellido">
            <p class="blanco-a form__label">Contraseña</p>
            <input type="password" class="form__input" v-model="usuario.password">
            <p class="blanco-a form__label">Verifica password</p>
            <input type="password" class="form__input" v-model="password2">
            <p class="blanco-a form__label">Mina</p>
            <select class="form__input" v-model="usuario.mina">
                <option
                    v-for="m in minas"
                    :key="m"
                    :value="m">
                    {{ m }}
                </option>
            </select>
            <p class="blanco-a form__label">Area</p>
            <select class="form__input" v-model="area">
                <option 
                    v-for="a in areas"
                    :key="a"
                    :value="a">
                    {{ a }}
                </option>
            </select>
            <input type="submit" class="boton-crear boton-usuario blanco-a txt-upper" value="Guardar">
        </form>
    </div>
</template>

<script>
import { ref, computed, toRefs } from 'vue'
import usuariosService from '@/services/usuariosService'

export default {
    props: {
        mostrarForm: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const { mostrarForm } = toRefs(props);
        const usuario = ref({
            correo: '',
            nombre: '',
            apellido: '',
            password: '',
            mina: '',
            area: ''
        });
        const password2 = ref('');

        //Metodos
        const reiniciarCampos = () => {
            usuario.value.correo = '';
            usuario.value.nombre = '';
            usuario.value.apellido = '';
            usuario.value.password = '';
            usuario.value.mina = '';
            usuario.value.area = '';
        }
        const actualizarUsuarios = () => emit('actualizarUsuarios');
        const ocultarFormulario = () => emit('ocultarFormulario');
        const crearUsuario = async() => {
            try{
                const res = await usuariosService.create(usuario.value);
                const { data } = await res.data;

                console.log(data);
                reiniciarCampos();
                actualizarUsuarios();
            }catch(err){
                console.log(err)
            }
        }

        //Propiedades computadas
        const ocultarForm = computed(() => ({
            'ocultar-layout': mostrarForm.value
        }));

        return {
            usuario,
            password2,
            ocultarForm,
            crearUsuario,
            ocultarFormulario
        }
    }
}
// export default {
//     props: {
//         mostrarForm: {
//             type: Boolean
//         },
//         usuario: {
//             type: Object,
//             required: false
//         }
//     },
//     data() {
//         return {
//             correo: '',
//             nombre: '',
//             apellido: '',
//             password: '',
//             password2: '',
//             mina: '',
//             area: '',
//             ocultar: true,
//             minas: ['HERMOSILLO', 'CANANEA'],
//             areas: ['A', 'B', 'C', 'D']
//         }
//     },
//     methods: {
//         async crearUsuario() {
//             try{
//                 const usuario = {
//                     correo: this.correo,
//                     nombre: this.nombre,
//                     apellido: this.apellido,
//                     password: this.password,
//                     mina: this.mina,
//                     area: this.area
//                 };

//                 const res = await usuariosServicio.post(usuario);
//                 const data = await res.data;
//                 const { status, statusText } = res;

//                 if(status < 200 || status > 299) throw { status, statusText };

//                 this.reiniciarCampos();
//                 this.actualizarUsuarios();
//             }catch({ status, statusText }){
//                 const mensaje = statusText || 'Ocurrio un error';
//                 console.log({ mensaje, status })
//             }
//         },  
//         ocultarFormulario() {
//             this.$emit('ocultarFormulario');
//         },
//         actualizarUsuarios() {
//             this.$emit('actualizarUsuarios');
//         },
//         reiniciarCampos() {
//             this.correo = '';
//             this.nombre = '';
//             this.apellido = '';
//             this.password = '';
//             this.password2 = '';
//             this.mina = '';
//             this.area = '';
//         }
//     },
//     computed: {
//         ocultarForm() {
//             return { 'ocultar-layout': this.mostrarForm }
//         }
//     },
//     watch: {
//         usuario(newUsuario, oldUsuario){
//             const { correo, nombre, apellido, mina, area } = newUsuario;
//             this.correo = correo;
//             this.nombre = nombre;
//             this.apellido = apellido;
//             this.mina = mina;
//             this.area = area;
//         }
//     }
// }
</script>

<style scoped>
    .layout-usuario-form{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-color: rgba(17, 16, 16, 0.8);
        transition: all .8s ease-in-out;
    }
    .titulo-usuario{
        margin-bottom: 1rem;
    }
    .boton-usuario{
        margin-top: 1.8rem;
    }
    .ocultar-layout{
        transform: translateY(-100vh);
        visibility: hidden;        
    }
</style>