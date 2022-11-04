<template>
  <div class="container">
    <Loader v-if="procesando"></Loader>
    <Header v-if="autenticado"></Header>
    <h1 v-if="autenticado">{{ usuario.nombre }}</h1>
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'

export default {
  components: {
    Header: defineAsyncComponent(
      () => import('./modules/shared/components/HeaderComponent.vue')
    ),
    Loader: defineAsyncComponent(
      () => import('./modules/shared/components/LoaderComponent.vue')
    )
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'autenticado',
      'procesando',
      'usuario'
    ])
  }
}
</script>