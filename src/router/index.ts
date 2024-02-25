import { createRouter, createWebHistory } from 'vue-router'
import InfoView from '../views/InfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'info',
      component: InfoView
    },
    {
      path: '/res',
      name: 'res',
      component: () => import('../views/ResView.vue')
    },
    {
      path: '/chat',
      name: 'char',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/MeView.vue')
    }
  ]
})

export default router
