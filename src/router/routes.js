const Home = () => import('@/views/Home/Home.vue')
const Explore = () => import('@/views/Explore/Explore.vue')
const My = () => import('@/views/My/My.vue')
const Login = () => import('@/views/Login/Login.vue')
const PlayList = () => import('@/views/PlayList/PlayList.vue')
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { keepAlive: true }
    },
    {
        path: '/explore',
        name: 'explore',
        component: Explore,
        meta: { keepAlive: true }
    },
    {
        path: '/my',
        name: 'my',
        component: My,
        meta: { requireAuth: true, keepAlive: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/playlist/:id',
        name: 'playlist',
        component: PlayList
    }
]
