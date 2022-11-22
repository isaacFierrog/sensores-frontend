<template>
  <div class="container">
    <!-- <Loader v-if="procesando"></Loader> -->
    <Header v-if="autenticado"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia' 
import useAuthStore from './store/useAuthStore'

export default {
  components: {
    Header: defineAsyncComponent(
      () => import('./modules/shared/components/HeaderComponent.vue')
    )
  },  
  setup() {
    console.log('PUNTO DE ACCESO');
    const TIEMPO_REFRESH = 420000;
    const store = useAuthStore();
    const { autenticado, referenciaRefresh } = storeToRefs(store);
    const { verificarAutenticacion, actualizarToken } = store;

    verificarAutenticacion();
    
    if(autenticado.value && !referenciaRefresh.value){
      referenciaRefresh.value = setInterval(() => {
        actualizarToken();
        console.log('Se autentica el token');
      }, TIEMPO_REFRESH);
    }

    return { autenticado };
  }
}
</script>