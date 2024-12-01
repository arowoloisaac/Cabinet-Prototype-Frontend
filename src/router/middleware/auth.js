// router/middleware/auth.js

import { useUserStore } from '@/stores/UserStore';
import { ElMessage } from 'element-plus';

export function requireAuth(to, from, next) {
    const userStore = useUserStore();
    const isLoggedIn = !!userStore.userInfo.token;

    if (to.meta.requiresAuth && !isLoggedIn) {
        ElMessage.warning('Please log in to access this page.');
        return next({ path: '/login', query: { redirect: to.fullPath } });
    }

    /* if (to.meta.roles) {
       const userRoles = userStore.userInfo.profile.roles || [];
       const hasRole = to.meta.roles.some(role => userRoles.includes(role));
       if (!hasRole) {
         ElMessage.error('You do not have permission to access this page.');
         return next({ path: '/' });
       }
     }*/

    if (to.meta.guest && isLoggedIn) {
        return next({ path: '/' });
    }

    next();
}
