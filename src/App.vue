<template>
  <div class="container">
    <Loader v-if="procesando"></Loader>
    <Header v-if="estaAutenticado"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'

const convertirAMilisegundos = minutos => minutos * 60 * 1000; 
const minutos = 0.2;

export default {
  components: {
    Header: defineAsyncComponent(
      () => import('./modules/shared/components/HeaderComponent.vue')
    ),
    Loader: defineAsyncComponent(
      () => import('./modules/shared/components/LoaderComponent.vue')
    )
  },
  created(){
    if(this.estaAutenticado){
      console.log('Ya estamos autenticados')
      this.refrescarToken();
    }
  },
  data() {
    return {}
  },
  methods: {
    refrescarToken() {
      this.$store.commit('guardarReferenciaToken', setInterval(() => {
        this.refreshToken();
      }, convertirAMilisegundos(minutos)))
    },
    ...mapActions({
      refreshToken: 'refrescarToken'
    })
  },
  computed: {
    ...mapState([
      'refRefrescarToken',
      'procesando'
    ]),
    ...mapGetters([
      'estaAutenticado'
    ])
  }
}
</script>