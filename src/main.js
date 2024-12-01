import '@/styles/common.scss'
import "mdb-vue-ui-kit/css/mdb.min.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

app.use(createPinia())
const pinia = createPinia();
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.mount('#app')
