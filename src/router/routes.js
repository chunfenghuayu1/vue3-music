const Home = () => import('@/views/Home/Home.vue')
const Explore = () => import('@/views/Explore/Explore.vue')
const My = () => import('@/views/My/My.vue')

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/explore',
        name: 'explore',
        component: Explore
    },
    {
        path: '/my',
        name: 'my',
        component: My
    }
]
