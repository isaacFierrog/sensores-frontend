<template>
    <div class="layout-modulo-form" :class="ocultarForm">
        <button class="txt-upper blanco-a titulo-modulo boton-cerrar" @click="ocultarFormulario">x</button>
        <h2 class="txt-upper blanco-a titulo-modulo">Crear modulo</h2>
        <form class="form" @submit.prevent="crearModulo">
            <p class="blanco-a form__label">Mac</p>
            <input type="text" class="form__input" v-model="mac">
            <p class="blanco-a form__label">Mina</p>
            <input type="text" list="minas" class="form__input" v-model="mina">
            <datalist class="form__input" id="minas">
                <option
                    v-for="m in minas"
                    :key="m"
                    :value="m">
                    {{ m }}
                </option>
            </datalist>
            <p class="blanco-a form__label">Area</p>
            <input type="text" list="areas" class="form__input" v-model="area">
            <datalist class="form__input" id="areas">
                <option 
                    v-for="a in areas"
                    :key="a"
                    :value="a">
                    {{ a }}
                </option>
            </datalist>
            <section class="sensores">
                <div class="sensores__boton blanco-a" @click="eliminarSensores">-</div>
                <p>Sensores: {{ numSensores }}</p>
                <div class="sensores__boton blanco-a" @click="agregarSensores">+</div>
            </section>
            <input type="submit" class="boton-crear boton-modulo blanco-a txt-upper" value="Guardar">
            <p v-if="mensajeError" class="mensaje mensaje--error mensaje--ocultar">Debes de llenar todos los campos</p>
            <p v-if="mensajeExito" class="mensaje mensaje--exito mensaje--ocultar">Modulo creado exitosamente</p>
        </form>
    </div>
</template>

<script>
    import modulosServicio from '../../services/modulosServicio.js';

    export default {
        props: {
            mostrarForm: {
                type: Boolean
            }
        },
        data() {
            return {
                mac: '',
                mina: '',
                area: '',
                sensores: [],
                ocultar: true,
                numSensores: 0,
                maxSensores: 8,
                minas: [
                    'HERMOSILLO', 
                    'CANANEA'
                ],
                areas: ['A', 'B', 'C', 'D'],
                mensajeExito: false,
                mensajeError: false
            }
        },
        methods: {
            agregarSensores(){
                if(this.numSensores >= this.maxSensores) return;
                const sensor = {
                    clave: `${this.mac}-${++this.numSensores}`
                };
                this.sensores.push(sensor);
            },
            eliminarSensores(){
                this.numSensores--;
                this.sensores.pop();
            },
            mostrarMensajeExito() {
                this.mensajeExito = true;
            },
            async crearModulo() {
                try{
                    const modulo = {
                        mac: this.mac,
                        mina: this.mina,
                        area: this.area,
                        sensores: this.sensores || []
                    }
                    const res = await modulosServicio.create(modulo);
                    const data = await res.data;
                    const { status, statusText } = res;
    
                    if(status < 200 || status > 299) throw { status, statusText };
                    
                    this.reiniciarCampos();
                    this.refrescarModulos();
                    this.mostrarMensajeExito();
                }catch({ status, statusText }){
                    const mensaje = statusText || 'Ocurrio un error';
                    console.log(`Error ${status}: ${mensaje}`);
                }
            },  
            ocultarFormulario() {
                this.$emit('ocultarFormulario');
            },
            refrescarModulos() {
                this.$emit('refrescarModulos')
            },
            reiniciarCampos() {
                this.mac = '';
                this.mina = '';
                this.area = '';
                this.numSensores = 0;
            }
        },
        computed: {
            ocultarForm() {
                return { 'ocultar-layout': this.mostrarForm }
            }
        }
    }
    </script>

<style scoped> 
    .mensaje{
        margin-top: 2rem;
        text-align: center;
        transition: all .2s ease-in-out;
    }
    .mensaje--ocultar{
        opacity: 0;
        visibility: hidden;
    }
    .mensaje--error{
        color: rgb(211, 53, 53);
    }
    .mensaje--exito{
        color: rgb(105, 211, 84);
    }
    .layout-modulo-form{
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
    .titulo-modulo{
        margin-bottom: 1rem;
    }
    .boton-modulo{
        margin-top: 1.8rem;
    }
    .ocultar-layout{
        transform: translateY(-100vh);
        visibility: hidden;        
    }
    .sensores{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .sensores__boton{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 4rem;
        font-size: 2rem;
        font-weight: bold;
        border: none;
        border-radius: 50%;
        background-color: rgb(57, 55, 70);
        transition: all .3s ease-in-out;
    }
    .sensores__boton:hover{
        cursor: pointer;
        background-color: rgb(69, 66, 92);
    }
</style>