import type { RouteRecordRaw } from 'vue-router'
const Home = () => import('@/views/Home/Home.vue')
const Explore = () => import('@/views/Explore/Explore.vue')
const My = () => import('@/views/My/My.vue')
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: '主页', scrollTop: 0 }
    },
    {
        path: '/explore',
        name: 'explore',
        component: Explore,
        meta: { title: '发现', scrollTop: 0 }
    },
    {
        path: '/my',
        name: 'my',
        component: My,
        meta: { title: '我的', scrollTop: 0 }
    }
]
export default routes
