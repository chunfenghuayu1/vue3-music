import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import jsCookie from 'js-cookie'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ top: from.meta.scrollTop })
            }, 150)
        })
    },
    base: '/'
})

router.beforeEach(to => {
    to.meta.scrollTop = document.documentElement.scrollTop
    if (to.meta.requireAuth) {
        if (!jsCookie.get('__csrf')) {
            return { path: '/login', query: { redirect: to.path } }
        }
        return true
    }
    if (to.path === '/login' && jsCookie.get('__csrf')) {
        return { path: '/' }
    }
    if (to.path === '/explore' && !to.query.cat) {
        return { path: '/explore', query: { cat: '全部' } }
    }
    return true
})
export default router
