import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
// import jsCookie from 'js-cookie'
import { IS_ELECTRON } from '@/utils/electron/myAPI'
const router = createRouter({
    history: IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes
})

import { useLocalStore } from '@/stores/localStore'

router.beforeEach(to => {
    const localStore = useLocalStore()
    // 暂不开启win端强制登陆
    if (IS_ELECTRON) {
        if (!localStore.loginStatus && to.path !== '/login') {
            return { path: '/login' }
        }
    }
    if (to.meta.requireAuth && !localStore.loginStatus) {
        return { path: '/login', query: { redirect: to.path } }
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
