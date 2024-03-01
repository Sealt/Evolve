import { createRouter, createWebHistory } from 'vue-router'
import InfoView from '../views/InfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'infoview',
      component: InfoView
    },
    {
      path: '/res',
      name: 'resview',
      component: () => import('../views/ResView.vue')
    },
    {
      path: '/chat',
      name: 'chatview',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/me',
      name: 'meview',
      component: () => import('../views/MeView.vue')
    },
    {
      path: '/event/:id',
      name: 'eventpage',
      component: () => import('../pages/ProjectPage.vue')
    },
    {
      path: '/info/:id',
      name: 'infopage',
      component: () => import('../pages/InfoCardPage.vue')
    }
  ]
})

export default router
