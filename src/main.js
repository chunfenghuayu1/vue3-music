import { createApp } from 'vue'
import './style/main.css'
import App from './App.vue'
// import 'element-plus/theme-chalk/display.css'
// 路由管理
import router from './router'
// 状态管理
import { createPinia } from 'pinia'
//  api接口
import * as API from '@/api'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue' // svg组件

const app = createApp(App)
app.config.globalProperties.$http = API
app.use(router)
app.component('SvgIcon', SvgIcon)
app.use(createPinia())
app.mount('#app')
