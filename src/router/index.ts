import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Index.vue'
import { routes } from "./modules/index";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/modal',
      children: routes
    },
  ]
})

export default router
