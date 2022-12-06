<template>
    <div class="modulo">
        <p class="modulo__mina blanco-b txt-upper">{{ modulo.mina }}</p>
        <h3 class="modulo__mac blanco-a txt-upper">{{ modulo.mac }}</h3>
        <footer class="modulo__footer">
            <p class="modulo__zona blanco-b txt-upper">area: {{ modulo.area }}</p>
            <section class="acciones">
                <i 
                    class="fa-solid fa-trash acciones__icono"
                    @click="eliminarModulo">
                </i>
                <i 
                    class="fa-solid fa-pen-to-square acciones__icono" 
                    @click="editarModulo">
                </i>
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
    },
    setup() {
        //Metodos
        const eliminarModulo = () => {
            console.log('Eliminar modulo')
        };
        const editarModulo = () => {
            console.log('Editar modulo')
        };
        return {
            //Metodos
            eliminarModulo,
            editarModulo
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
        background-color: #242629;
        border: none;
        border-top: 3rem solid #2cb67d;
        border-radius: .6rem;
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