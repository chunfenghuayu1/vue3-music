import { createPinia } from 'pinia'
import type { App } from 'vue'
import persist from './persist'

const pinia = createPinia()
pinia.use(persist)

export default {
    install(app: App) {
        app.use(pinia)
    }
}
