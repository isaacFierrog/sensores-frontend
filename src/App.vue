<template>
  <div class="container">
    <Loader v-if="procesandoSolicitud"></Loader>
    <Header v-if="usuarioAutenticado"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from './store/useMainStore'
import useAuthStore from './modules/auth/store/useAuthStore'


export default {
  components: {
    Header: defineAsyncComponent(
      () => import('./modules/shared/components/HeaderComponent.vue')
    ),
    Loader: defineAsyncComponent(
      () => import('./modules/shared/components/LoaderComponent.vue')
    )
  },  
  setup() {
    //Data
    const store = useMainStore();
    const { procesandoSolicitud } = storeToRefs(store);
    
    const authStore = useAuthStore();
    const {
      usuarioAutenticado,
      refRenovarToken,
      tiempoActualizacion
    } = storeToRefs(authStore);

    //Metodos
    const { renovarToken } = authStore;

    if(usuarioAutenticado.value)
      refRenovarToken.value = setInterval(
        () => renovarToken(),
        tiempoActualizacion.value
      );
    

    return {
      usuarioAutenticado, 
      procesandoSolicitud
    }
  }
}
</script>