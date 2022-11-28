<template>
  <div class="container">
    <Loader v-if="procesandoSolicitud"></Loader>
    <Header v-if="autenticado"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from './store/useMainStore'

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
    const store = useMainStore();
    const { autenticado, procesandoSolicitud } = storeToRefs(store);

    return {
      autenticado, 
      procesandoSolicitud
    }
  }
}
</script>