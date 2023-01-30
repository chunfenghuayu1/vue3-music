import type { RouteRecordRaw } from 'vue-router'
const Home = () => import('@/views/Home/Home.vue')
const Explore = () => import('@/views/Explore/Explore.vue')
const My = () => import('@/views/My/My.vue')
const Login = () => import('@/views/Login/Login.vue')
const Artist = () => import('@/views/Artist/Artist.vue')
const Mv = () => import('@/views/Mv/Mv.vue')
const LikeSongs = () => import('@/views/LikeSongs/LikeSongs.vue')
const PlayList = () => import('@/views/PlayList/PlayList.vue')
const Album = () => import('@/views/Album/Album.vue')
const Search = () => import('@/views/Search/Search.vue')
const DailySong = () => import('@/views/dailySong/dailySong.vue')
const Settings = () => import('@/views/Settings/Settings.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: '主页' }
    },
    {
        path: '/explore',
        name: 'explore',
        component: Explore,
        meta: { title: '发现' }
    },
    {
        path: '/my',
        name: 'my',
        component: My,
        meta: { title: '我的', requireAuth: true }
    },
    { path: '/login', name: 'login', component: Login },
    {
        path: '/artist/:id',
        name: 'artist',
        component: Artist
    },
    {
        path: '/mv/:vid',
        name: 'mv',
        component: Mv
    },
    {
        path: '/likesongs',
        name: 'likesongs',
        component: LikeSongs,
        meta: { requireAuth: true }
    },
    {
        path: '/playlist/:id',
        name: 'playlist',
        component: PlayList
    },
    {
        path: '/album/:id',
        name: 'album',
        component: Album
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/dailySong',
        name: 'dailySong',
        component: DailySong,
        meta: { requireAuth: true }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    }
]
export default routes
