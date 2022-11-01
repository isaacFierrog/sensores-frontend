<script>
import { RouterView } from 'vue-router'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Header: defineAsyncComponent(
      () => import('./modules/shared/components/HeaderComponent.vue')
    )
  },
  data() {
    return {}
  },
  mounted() {
    console.log('Aplicacion iniciada');
  }
}
</script>

<template>
  <div class="container">
    <Header></Header>
    <RouterView />
  </div>
</template>

<style scoped>
  
</style>