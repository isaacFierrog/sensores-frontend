<template>
    <article class="usuario">
        <section>
            <h3 class="usuario__nombre blanco-a txt-upper">
                {{ nombre }} {{ apellido }}
            </h3>    
            <p class="blanco-b">
                {{ correo }} | {{ mina }} | {{ area }}
            </p>
        </section>
        <section class="acciones">
            <i class="fa-solid fa-trash acciones__icono"></i>
            <i class="fa-solid fa-pen-to-square acciones__icono" @click="editarUsuario"></i>
        </section>
    </article>
</template>

<script>
import { toRefs } from 'vue'

export default {
    props: {
        usuario: {
            type: Object,
            required: false
        }
    },
    setup(props, { emit }) {
        const { usuario } = toRefs(props);
        const { nombre, apellido, correo, mina, area } = toRefs(usuario.value);
        const editarUsuario = () => emit('editarUsuario', usuario.value);

        return {
            nombre,
            apellido, 
            correo, 
            mina,
            area,
            editarUsuario
        };
    }
}
</script>

<style scoped>
    .usuario{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 2rem;
        margin-bottom: 1rem;
        background-color: rgb(19, 18, 24);
        border: none;
        border-left: 1rem solid red;
        border-radius: 1rem;
    }
    .usuario:first-of-type{
        margin-top: 1rem;
    }
    .usuario:last-of-type{
        margin-bottom: 0;
    }
    .usuario__nombre{
        margin-bottom: .5rem;
    }
    .acciones{
        height: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .acciones__icono:hover{
        cursor: pointer;
    }
</style>