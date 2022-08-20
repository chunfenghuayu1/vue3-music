import { createApp } from 'vue'

import App from './App.vue'
import './style/main.css'
import '@/externals.js'
import { ElNotification } from 'element-plus'

// 配置响应式样式
// import 'element-plus/theme-chalk/display.css'
// 路由管理
import router from './router'
// 状态管理
import { createPinia } from 'pinia'
//  api接口
import * as API from '@/api'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue' // svg组件
// 导入共享文字
import i18n from '@/utils/i18n.js'

const app = createApp(App)

app.config.globalProperties.$http = API
app.config.globalProperties.$notify = ElNotification
app.config.globalProperties.$t = i18n

app.use(router)
app.component('SvgIcon', SvgIcon)
app.use(createPinia())
app.mount('#app')
