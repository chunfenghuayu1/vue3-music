import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
// import jsCookie from 'js-cookie'
const router = createRouter({
    history: createWebHistory('/'),
    routes
})
import { useLocalStore } from '@/stores/localStore'
router.beforeEach(to => {
    const localStore = useLocalStore()
    // to.meta.scrollTop = document.documentElement.scrollTop
    if (to.meta.requireAuth) {
        if (!localStore.loginStatus) {
            return { path: '/login', query: { redirect: to.path } }
        }
        return true
    }
    if (to.path === '/login' && localStore.loginStatus) {
        return { path: '/' }
    }
    if (to.path === '/explore' && !to.query.cat) {
        return { path: '/explore', query: { cat: '全部' } }
    }
    return true
})
export default router
