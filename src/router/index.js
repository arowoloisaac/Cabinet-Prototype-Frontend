import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/login/index.vue"
import Register from "@/views/Register/index.vue"
import Layout from "@/views/Layout/index.vue"
import AdminPage from "@/views/Admin/index.vue"
import Directions from '@/views/Admin/direction.vue'
import Group from '@/views/Admin/group.vue'
import Profile from '@/views/Profile/Profile.vue'
import changePassword from '@/views/ChangePassword/change-password.vue'
import CreateDiscipline from '@/views/Discipline/Create-discipline.vue'
import DisciplineList from '@/views/Discipline/DisciplineList.vue'
import ViewDiscipline from '@/views/Discipline/ViewDiscipline.vue'
import EditDiscipline from '@/views/Discipline/EditDiscipline.vue'
import AddSchedule from '@/views/Schedule/AddSchedule.vue'
import EditSchedule from '@/views/Schedule/EditSchedule.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      children: [
        {
          path: "",
          component: DisciplineList,
        },
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
          path: "admin/faculty/direction/:id",
          component: Directions,
        },
        {
          path: "admin/faculty/direction/group/:id",
          component: Group,
        },
        {
          path: "profile",
          component: Profile,
        },
        {
          path: "reset-pasword",
          component: changePassword,
        },
        {
          path: "faculty/direction/group/discipline",
          component: DisciplineList,
        },

        {
          path: "admin/faculty/direction/discipline/create",
          component: CreateDiscipline,
        },
        {
          path: "admin/faculty/direction/discipline/edit/:id",
          component: EditDiscipline,
        },
        {
          path: "discipline/display/:id",
          component: ViewDiscipline,
        }, 
        {
          path: "add-schedule",
          component: AddSchedule,
        },
        {
          path: "edit-schedule/:id",
          component: EditSchedule,
        }
      ],
    },
  ],
});

export default router
