<template>
    <div class="nav">
        <RouterLink class="nav__link" :to="{name:'modulos-listar'}">
            <i class="nav__icon fa-solid fa-satellite-dish"></i>
            <p class="nav__descripcion">modulos</p>
        </RouterLink>
        <RouterLink class="nav__link" :to="{name:'usuarios-listar'}">
            <i class="nav__icon fa-solid fa-user"></i>
            <p class="nav__descripcion">usuarios</p>
        </RouterLink>
        <a class="nav__link">
            <i class="nav__icon fa-solid fa-door-open"></i>
            <p class="nav__descripcion">salir</p>
        </a>
    </div>
</template>

<script>
export default {
    setup(){
        return {}
    }
}
</script>

<style scoped>
    .nav{
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        width: 100%;
        background-color: rgb(32, 46, 54);
    }
    .nav__link{
        flex-grow: 1;
        padding: 2rem;
        font-weight: bold;
        text-align: center;
        color: #fffffe;
        transition: all .3s ease-in-out;
    }
    .nav__link:nth-last-of-type(2){
        border-left: .1rem solid rgb(126, 126, 126);
        border-right: .1rem solid rgb(126, 126, 126);
    }
    .nav__descripcion{
        font-weight: 400;
        font-size: 1.2rem;
    }
    
    .router-link-exact-active{
        color: #5b9de7;
    }

    @media screen and (min-width: 768px) {
        .nav{
            position: relative;
            width: auto;
            background: none;
        }
        .nav__link:nth-last-child(2){
            border: none;
        }
        .nav__icon{
            display: none;
        }
        .nav__descripcion{
            font-size: 1.6rem;
            font-weight: bold;
        }
        .nav__link:hover{
            background-color: #72757e;
            cursor: pointer;
        }
    }
</style>