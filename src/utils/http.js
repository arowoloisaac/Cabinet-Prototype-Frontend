import axios from 'axios'
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '../stores/UserStore';
import router from '../router';

// 创建axios实例
const http = axios.create({
  baseURL: "https://localhost:7055",
  timeout: 5000,
});

// axios请求拦截器
// 一般会进行token身份验证等
http.interceptors.request.use(config => {
  const userStore = useUserStore();
  const token = userStore.userInfo.token;
  if(token){
      config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))


// axios响应式拦截器
// 一般进行错误的统一提示，token失效的处理等
http.interceptors.response.use(res => res.data, e => {
  // 401 token失效处理
  if (e.response && e.response.status === 401) {
    const userStore = useUserStore();
    userStore.clearUserInfo(); // 清除用户信息
    ElMessage({type: 'error', message: '登录已过期，请重新登录'});
    router.push('/login');
  } else {
    ElMessage({type: 'error', message: e.response.message});
  }
  return Promise.reject(e);
});

export default http