<template>
    <div class="nav">
        <CustomLink 
            v-for="link in links"
            :key="link.to"
            :link="link"/>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
    props: {
        links: {
            type: Array,
            required: true
        }
    },
    components: {
        CustomLink: defineAsyncComponent(
            () => import('./CustomLink.vue')
        )
    },
    data(){
        return {
        }
    }
}
</script>

<style scoped>
    .router-link-exact-active{
        color: #2e7454;
    }
    .nav{
        display: flex;
    }
</style>