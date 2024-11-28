import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/login/index.vue"
import Register from "@/views/Register/index.vue"
import Layout from "@/views/Layout/index.vue"
import AdminPage from "@/views/Admin/index.vue"
import Directions from '@/views/Admin/direction.vue'
import Group from '@/views/Admin/group.vue'
import Profile from '@/views/Profile/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      children: [
        {
          path: "login",
          component: Login,
        },
        {
          path: "register",
          component: Register,
        },
        {
          path: "admin/home",
          component: AdminPage,
        },
        {
          path: "admin/faculty/direction",
          component: Directions,
        },
        {
          path: "admin/faculty/direction/group",
          component: Group,
        },
        {
          path: "profile",
          component: Profile
        }
      ],
    },
  ],
});

export default router
