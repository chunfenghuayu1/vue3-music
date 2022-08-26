import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useStorageStore } from '@/store/Storage.js'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})
router.beforeEach((to, from) => {
    const storageStore = useStorageStore()
    const loginMode = storageStore.data.loginMode
    if (to.meta.requireAuth) {
        if (loginMode === '') {
            return { path: '/login', query: { redirect: from.path } }
        }
        return true
    }
    if (to.path === '/login' && loginMode !== '') {
        return { path: '/' }
    }
    return true
})
export default router
