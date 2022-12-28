const Home = () => import('@/views/Home/Home.vue')
const Explore = () => import('@/views/Explore/Explore.vue')
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: '主页', scrollTop: 0 },
        children: [
            {
                path: 'aa',
                name:'aa',
                component: Explore
            }
        ]
    }
]
