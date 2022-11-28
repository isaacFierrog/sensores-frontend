import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import useMainStore from '../store/useMainStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/autenticacion'
    },
    {
      path: '/autenticacion',
      name: 'autenticacion',
      component: () => import('../modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../modules/auth/views/LoginView.vue')
        }
      ]
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../modules/usuarios/layouts/UsuariosLayout.vue'),
      children: [
        {
          path: '',
          name: 'usuarios-listar',
          component: () => import('../modules/usuarios/views/ListadoView.vue')
        }
      ]
    },
    {
      path: '/modulos',
      name: 'modulos',
      component: () => import('../modules/modulos/layouts/ModulosLayout.vue'),
      children: [
        {
          path: '',
          name: 'modulos-listar',
          component: () => import('../modules/modulos/views/ListadoView.vue')
        },
        {
          path: ':id',
          name: 'modulos-detalle',
          component: () => import('../modules/modulos/views/DetallesView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useMainStore();
  const { autenticado, refRefreshToken } = storeToRefs(store);
  const { actualizarTokenAccess } = store; 
  if(autenticado.value && !refRefreshToken.value) actualizarTokenAccess()
  
  if(to.name !== 'login' && !autenticado.value) next({ name: 'login' }); 
  else if(to.name === 'login' && autenticado.value) next({ name: 'modulos-listar' });
  else next();
})

export default router
