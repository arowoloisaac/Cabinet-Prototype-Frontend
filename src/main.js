import '@/styles/common.scss'
import "mdb-vue-ui-kit/css/mdb.min.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { QuillEditor } from '@vueup/vue-quill';

const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(createPinia())
const pinia = createPinia();
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.mount('#app')
