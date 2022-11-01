<template>
    <div class="modulo">
        <p class="modulo__mina blanco-b txt-upper">{{ modulo.mina }}</p>
        <h3 class="modulo__mac blanco-a txt-upper">{{ modulo.mac }}</h3>
        <footer class="modulo__footer">
            <p class="modulo__zona blanco-b txt-upper">area: {{ modulo.area }}</p>
            <section>
                <i class="fa-solid fa-trash acciones__icono"></i>
                <i class="fa-solid fa-pen-to-square acciones__icono" @click="editarUsuario"></i>
            </section>
        </footer>
    </div>
</template>

<script>
export default {
    props: {
        modulo: {
            type: Object
        }
    }
}
</script>

<style scoped>
    .modulo{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-basis: calc((100% / 4) - 1rem);
        height: 20rem;
        margin: 0 .3rem;
        margin-bottom: .8rem;
        padding: 2rem 2rem;
        background-color: #72757e;
        border: none;
        border-top: 3rem solid #094067;
        border-radius: 1.5rem;
        transition: all .3s ease-in-out;
    }
    .modulo:hover{
        cursor: pointer;
        background-color: rgb(49, 45, 65);
    }
    .modulo__footer{
        display: flex;
        justify-content: space-between;
    }
    .modulo__mac{
        font-size: 2.5rem;
    }
</style>