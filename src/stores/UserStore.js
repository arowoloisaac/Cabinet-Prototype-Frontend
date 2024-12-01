// stores/UserStore.js

import { loginApi, getProfileApi, updateProfileApi } from "@/apis/User";
import { defineStore } from "pinia";
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({
        token: null,
        profile: {}
    });

    // Action to log in and fetch the user profile
    const getUserInfo = async (user) => {
        const res = await loginApi(user);
        userInfo.value.token = res.token;
        await fetchUserProfile();
    };

    // Action to fetch the user profile
    const fetchUserProfile = async () => {
        const profile = await getProfileApi();
        userInfo.value.profile = profile;
    };

    // Action to update the user profile
    const updateUserProfile = async (profileData) => {
        await updateProfileApi(profileData);
        // Refresh the profile data after update
        await fetchUserProfile();
    };

    // Clear user info on logout
    const clearUserInfo = () => {
        userInfo.value = {
            token: null,
            profile: {}
        };
    };

    return {
        userInfo,
        getUserInfo,
        fetchUserProfile,
        updateUserProfile,
        clearUserInfo,
    };
}, {
    persist: true
});
