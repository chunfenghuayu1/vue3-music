const Home = () => import('@/views/Home/Home.vue')
const Explore = () => import('@/views/Explore/Explore.vue')
const My = () => import('@/views/My/My.vue')
const Login = () => import('@/views/Login/Login.vue')
const PlayList = () => import('@/views/PlayList/PlayList.vue')
const NewAlbum = () => import('@/views/NewAlbum/NewAlbum.vue')
const Artist = () => import('@/views/Artist/Artist.vue')
const LikeSongs = () => import('@/views/LikeSongs/LikeSongs.vue')
const Search = () => import('@/views/Search/Search.vue')
const MV = () => import('@/views/MV/MV.vue')
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { scrollTop: 0 }
    },
    {
        path: '/explore',
        name: 'explore',
        component: Explore,
        meta: { scrollTop: 0 }
    },
    {
        path: '/my',
        name: 'my',
        component: My,
        meta: { requireAuth: true, scrollTop: 0 }
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
    },
    {
        path: '/newAlbum/:id',
        name: 'newAlbum',
        component: NewAlbum
    },
    {
        path: '/artist/:id',
        name: 'artist',
        component: Artist
    },
    {
        path: '/likesongs',
        name: 'likesongs',
        component: LikeSongs,
        meta: { requireAuth: true }
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/mv/:vid',
        name: 'mv',
        component: MV
    }
]
