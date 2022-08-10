import { createApp } from 'vue'
import './style/main.css'
import App from './App.vue'
// 路由管理
import router from './router'
// 状态管理
import { createPinia } from 'pinia'
//  api接口
import * as API from '@/api'

const app = createApp(App)
app.config.globalProperties.$http = API
app.use(router).use(createPinia()).mount('#app')
