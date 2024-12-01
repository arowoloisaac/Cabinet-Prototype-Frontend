// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/views/login/index.vue";
import Register from "@/views/Register/index.vue";
import Layout from "@/views/Layout/index.vue";
import AdminPage from "@/views/Admin/index.vue";
import Directions from '@/views/Admin/direction.vue';
import Group from '@/views/Admin/group.vue';
import Profile from '@/views/Profile/Profile.vue';
import { requireAuth } from './middleware/auth';

const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    children: [
      {
        path: "login",
        component: Login,
        meta: { guest: true },
        beforeEnter: (to, from, next) => {
          // Only allow unauthenticated users
          requireAuth(to, from, next);
        }
      },
      {
        path: "register",
        component: Register,
        meta: { guest: true },
        beforeEnter: (to, from, next) => {
          // Only allow unauthenticated users
          requireAuth(to, from, next);
        }
      },
      {
        path: "admin/home",
        component: AdminPage,
        /*meta: { requiresAuth: true, roles: ['admin'] },
        beforeEnter: requireAuth*/
      },
      {
        path: "admin/faculty/direction/:id",
        component: Directions,
        /*meta: { requiresAuth: true, roles: ['admin'] },
       beforeEnter: requireAuth*/
      },
      {
        path: "admin/faculty/direction/group/:id",
        component: Group,
        /*meta: { requiresAuth: true, roles: ['admin'] },
       beforeEnter: requireAuth*/
      },
      {
        path: "profile",
        component: Profile,
        meta: { requiresAuth: true },
        beforeEnter: requireAuth
      },
    ],
  },
  // Redirect unknown routes to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
