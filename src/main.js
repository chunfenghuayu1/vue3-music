import { createApp } from 'vue'

import App from './App.vue'
import './style/main.css'
import '@/externals.js'
import { ElMessage } from 'element-plus'
import VueLazyload from 'vue-lazyload'
import lazyImg from '/img_loading.gif'
// 配置响应式样式
// import 'element-plus/theme-chalk/display.css'
// 路由管理
import router from './router'
// 状态管理
import { createPinia } from 'pinia'
import persist from '@/store/Subscribe/persist.js'
//  api接口
import * as API from '@/api'
import 'virtual:svg-icons-register'
// 导入共享文字
import i18n from '@/utils/i18n.js'

const app = createApp(App)

app.config.globalProperties.$http = API
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$t = i18n
app.config.performance = true
app.use(VueLazyload, {
    preLoad: 1.3, //预加载的宽高比
    loading: lazyImg, //图片加载状态下显示的图片
    // error: errorimage, //图片加载失败时显示的图片
    attempt: 1 // 加载错误后最大尝试次数
})
const pinia = createPinia()
pinia.use(persist)
app.use(router)
app.use(pinia)
app.mount('#music')
