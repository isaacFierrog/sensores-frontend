<template>
    <div class="layout-modulo-form" :class="ocultarForm">
        <button class="txt-upper blanco-a titulo-modulo boton-cerrar" @click="ocultarFormulario">x</button>
        <h2 class="txt-upper blanco-a titulo-modulo">Crear modulo</h2>
        <form class="form" @submit.prevent="crearModulo">
            <p class="blanco-a form__label">Mac</p>
            <input type="text" class="form__input" v-model="mac">
            <p class="blanco-a form__label">Mina</p>
            <select class="form__input" v-model="mina">
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
            <section class="sensores">
                <div class="sensores__boton blanco-a" @click="eliminarSensores">-</div>
                <p>Sensores: {{ numSensores }}</p>
                <div class="sensores__boton blanco-a" @click="agregarSensores">+</div>
            </section>
            <input type="submit" class="boton-crear boton-modulo blanco-a txt-upper" value="Guardar">
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
                areas: ['A', 'B', 'C', 'D']
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