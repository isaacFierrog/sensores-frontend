<template>
    <div class="nav">
        <RouterLink class="nav__link" :to="{name:'modulos-listar'}">Modulos</RouterLink>
        <RouterLink class="nav__link" :to="{name:'usuarios-listar'}">Usuarios</RouterLink>
    </div>
</template>

<script>
export default {
    data(){
        return {}
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
    }
    .router-link-exact-active{
        color: #7f5af0;
    }
    .nav{
        display: flex;
    }
</style>