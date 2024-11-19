import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/login/index.vue"
import Register from "@/views/Register/index.vue"
import Layout from "@/views/Layout/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children:[
        {
          path:'login',
          component:Login,
        },
        {
          path:'register',
          component:Register,
        },
      ]
    },
  ],
})

export default router
