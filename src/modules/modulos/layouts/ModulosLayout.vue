<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    // beforeMount(){
    //     console.log('Iniciando Modulos')
    //     if(!this.estaAutenticado){
    //         console.log('No esta autenticado');
    //         this.$router.push({ name: 'login' });
    //     }else{
    //         console.log('Esta autenticado');
    //     }

    // },
    // computed: {
    //     ...mapGetters(['estaAutenticado'])
    // }
}
</script>