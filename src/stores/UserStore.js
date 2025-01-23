import { loginApi } from "@/apis/User";
import { defineStore } from "pinia";
import {ref} from 'vue';

export const useUserStore = defineStore('user',()=>{
    //1.定义管理用户数据的tsate
    const userInfo = ref({})

    //2.定义获取接口数据的action函数
    const getUserInfo = async(user)=>{
        const res = await loginApi(user)
        userInfo.value=res
    }
    //退出时清空用户信息
    const clearUserInfo = async() =>{
        userInfo.value = {}
    }

    //3.以对象的格式把state和action return
    return{
        userInfo,
        getUserInfo,
        clearUserInfo,
    }
},
{
    persist:true
})
