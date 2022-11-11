<template>
    <div class="nav">
        <RouterLink class="nav__link" :to="{name:'modulos-listar'}">Modulos</RouterLink>
        <RouterLink class="nav__link" :to="{name:'usuarios-listar'}">Usuarios</RouterLink>
        <a class="nav__link" @click="cerrarSesion">Log Out</a>
    </div>
</template>

<script>
import { mapState } from 'vuex';


const ls = localStorage;

export default {
    data(){
        return {}
    },
    methods: {
        cerrarSesion() {
            ls.clear();
            clearInterval(this.refRefrescarToken);
        }
    },
    computed: {
        ...mapState([
            'refRefrescarToken'
        ])
    }
}
</script>

<style scoped>
    .nav__link{
        padding: 2rem;
        font-weight: bold;
        color: #fffffe;
        transition: all .3s ease-in-out;
    }
    .nav__link:hover{
        background-color: #72757e;
        cursor: pointer;
    }
    .router-link-exact-active{
        color: #7f5af0;
    }
    .nav{
        display: flex;
    }
</style>