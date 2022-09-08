import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useStorageStore } from '@/store/Storage.js'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
    base: '/'
})

router.beforeEach(to => {
    const storageStore = useStorageStore()
    const loginMode = storageStore.data.loginMode
    if (to.meta.requireAuth) {
        if (loginMode === '') {
            return { path: '/login', query: { redirect: to.path } }
        }
        return true
    }
    if (to.path === '/login' && loginMode !== '') {
        return { path: '/' }
    }
    if (to.path === '/explore' && !to.query.cat) {
        return { path: '/explore', query: { cat: '全部' } }
    }
    return true
})
export default router
