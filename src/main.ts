import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './router/permission'
createApp(App)
.use(router)
.use(ElementPlus)
.use(createPinia())
.mount('#app')
