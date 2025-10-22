import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/LoginScreen.vue'),
  },
  {
    path: '/votacions',
    component: () => import('@/pages/VotacionsScreen.vue'),
  },
]

const router = createRouter({
  // Volvemos a 'createWebHistory' para un despliegue web estándar
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router