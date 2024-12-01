// utils/http.js

import axios from 'axios';
import { ElMessage } from "element-plus";
import 'element-plus/theme-chalk/el-message.css';
import { useUserStore } from '../stores/UserStore';
import router from '../router';

// Determine if mocking is enabled (set to true for development without backend)
const useMock = true; // Change to false when backend is available

// Create axios instance
const http = axios.create({
  baseURL: "http://localhost:5154", // Your backend URL
  timeout: 5000,
});

// Request interceptor
http.interceptors.request.use(config => {
  const userStore = useUserStore();
  const token = userStore.userInfo.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, e => Promise.reject(e));

// Response interceptor
http.interceptors.response.use(
    res => res.data,
    async e => {
      if (useMock && !e.response) {
        const { method, url, data } = e.config;

        // Mock login
        if (method === 'post' && url === '/api/user/login') {
          const { email, password } = JSON.parse(data);
          if (email && password) {
            return Promise.resolve({ token: 'mock-token' });
          } else {
            return Promise.reject({ response: { data: { message: 'Invalid credentials' } } });
          }
        }

        // Mock get profile
        if (method === 'get' && url === '/api/user/profile') {
          return Promise.resolve({
            firstName: 'John',
            lastName: 'Doe',
            birthDate: '1990-01-01',
            phoneNumber: '1234567890',
            avatar: '', // Empty to test default avatar
            email: 'john.doe@example.com',
          });
        }

        // Mock update profile
        if (method === 'put' && url === '/api/user/profile') {
          return Promise.resolve({ message: 'Profile updated successfully' });
        }
      }

      // Handle other errors
      if (e.response && e.response.status === 401) {
        const userStore = useUserStore();
        userStore.clearUserInfo();
        ElMessage({ type: 'error', message: 'Session expired, please log in again' });
        router.push('/login');
      } else {
        ElMessage({ type: 'error', message: e.response?.data?.message || 'An error occurred' });
      }
      return Promise.reject(e);
    }
);

export default http;
