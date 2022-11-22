<template>
    <header class="header">
        <h1 class="header__titulo">SENSORES</h1>
        <NavBar></NavBar>
    </header>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        NavBar: defineAsyncComponent(
            () => import('./Navbar.vue')
        )
    }
}
</script>

<style scoped>
    .header{ border: none; }
    .header__titulo{ display: none; }

    @media screen and (min-width: 768px) {
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
            border-bottom: .1rem solid #2cb67d;
        }
        .header__titulo{ display: block; }
    }
</style>