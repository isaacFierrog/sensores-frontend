<template>
    <header class="header">
        <h1>SENSORES</h1>
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
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;
        border-bottom: .1rem solid #2cb67d;
    }
</style>