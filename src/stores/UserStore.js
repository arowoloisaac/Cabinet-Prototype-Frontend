import { loginApi, getUserProfileAPI } from "@/apis/User";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore('user', () => {
    // 1. 定义管理用户数据的 state
    const userInfo = ref({});
    const userProfile = ref({});

    // 2. 定义获取接口数据的 action 函数
    const getUserInfo = async (user) => {
        const res = await loginApi(user);
        userInfo.value = res;
    };

    const getUserProfile = async (user) => {
        const res = await getUserProfileAPI(user);
        userProfile.value = res;
    };

    // 退出时清空用户信息
    const clearUserInfo = () => {
        userInfo.value = {};
        userProfile.value = {};
    };

    // 3. 定义计算属性
    const isAdmin = computed(() => userProfile.value?.roles?.includes('Admin'));

    // 4. 以对象的格式把 state 和 action return
    return {
        userInfo,
        userProfile,
        getUserInfo,
        getUserProfile,
        clearUserInfo,
        isAdmin
    };
}, {
    persist: true // 启用持久化
});