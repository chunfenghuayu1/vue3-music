import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/index.css'
import 'virtual:svg-icons-register'
import * as API from '@/api'

const app = createApp(App)

app.config.globalProperties.$http = API
app.config.performance = true

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
