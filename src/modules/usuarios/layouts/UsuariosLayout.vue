<template>
    <div class="container" v-if="estaAutenticado">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    beforeMount(){
        if(!this.estaAutenticado)
            this.$router.push({ name: 'login' });
    },
    computed: {
        ...mapGetters(['estaAutenticado'])
    }
}
</script>