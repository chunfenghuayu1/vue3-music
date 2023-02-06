import { createApp } from 'vue'

import pinia from '@stores/index'

import Directives from '@/directive'
import SvgIcon from '@components/SvgIcon.vue'
import App from './App.vue'
import router from '@router/index'
import '@assets/css/index.css'
import 'virtual:svg-icons-register'
import * as API from '@api/index'
import { ElMessage } from 'element-plus'
import VueLazyload from 'vue-lazyload'
import lazyImg from '@assets/img/img_loading.gif'
// 处理图片参数
import { imgUrl } from '@utils/imgUrl'
declare module 'vue' {
    interface ComponentCustomProperties {
        $http: typeof API
        $imgUrl: typeof imgUrl
        $message: typeof ElMessage
    }
}

const app = createApp(App)

app.config.globalProperties.$http = API
app.config.globalProperties.$imgUrl = imgUrl
app.config.globalProperties.$message = ElMessage
app.config.performance = true
app.use(VueLazyload, {
    preLoad: 1.3, //预加载的宽高比
    loading: lazyImg, //图片加载状态下显示的图片
    // error: errorimage, //图片加载失败时显示的图片
    attempt: 1 // 加载错误后最大尝试次数
})
app.component('SvgIcon', SvgIcon)

app.use(pinia)
app.use(Directives)
app.use(router)
app.mount('#app')
