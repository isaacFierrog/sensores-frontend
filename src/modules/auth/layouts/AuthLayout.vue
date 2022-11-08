<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    beforeMount(){
        if(this.estaAutenticado)
            this.$router.push({ name: 'modulos-listar' });
    },
    computed: {
        ...mapGetters(['estaAutenticado'])
    }
}
</script>