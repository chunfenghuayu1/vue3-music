<template>
    <nav
        class="fixed z-30 top-0 min-w-max w-full px-10vw lg:px-10 flex items-center justify-center backdrop-saturate-150 backdrop-blur-lg transition-all duration-300 ease-linear bg-theme-base bg-opacity-80"
        :class="IS_ELECTRON ? 'pt-5 h-20' : 'h-16'"
    >
        <CustomTitleBar></CustomTitleBar>
        <div class="flex items-center flex-1 space-x-4 lg:space-x-2">
            <button
                class="hover:bg-theme-baseSecond rounded-lg active:scale-90 transition p-0.5"
                @click="$router.go(-1)"
            >
                <SvgIcon name="back" size="32" class="text-theme-base fill-current"></SvgIcon>
            </button>
            <button
                class="hover:bg-theme-baseSecond rounded-lg active:scale-90 transition p-0.5"
                @click="$router.go(1)"
            >
                <SvgIcon name="forward" size="32" class="text-theme-base fill-current"></SvgIcon>
            </button>
        </div>
        <div class="flex flex-1 flex-shrink-0 justify-center items-center">
            <router-link
                to="/"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'home' ? 'text-theme-baseActive' : 'text-theme-base'"
                >首页</router-link
            >
            <router-link
                :to="{ name: 'explore', query: { cat } }"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'explore' ? 'text-theme-baseActive' : 'text-theme-base'"
                >发现</router-link
            >
            <router-link
                to="/my"
                class="mx-4 my-1 px-2 py-1 text-lg font-bold active:scale-95 rounded-md"
                :class="$route.name === 'my' ? 'text-theme-baseActive' : 'text-theme-base'"
                >我的</router-link
            >
        </div>
        <div class="flex flex-1 items-center justify-end min-w-max space-x-5">
            <SearchInput></SearchInput>
            <SwitchTheme></SwitchTheme>
            <!-- 头像 -->
            <div class="relative">
                <DropDown
                    v-model:toggleShow="toggleShow"
                    v-model:type="type"
                    :row="list"
                    @click="handlerDrop"
                >
                    <template #button>
                        <el-avatar
                            :size="32"
                            fit="cover"
                            class="select-none cursor-pointer align-middle"
                            :src="localStore.avatarUrl === '' ? avatar : localStore.avatarUrl"
                            @click.stop="toggleShow = !toggleShow"
                        >
                        </el-avatar>
                    </template>
                </DropDown>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import SwitchTheme from './SwitchTheme.vue'
import DropDown from '@components/DropDown.vue'

import { IS_ELECTRON } from '@utils/electron/myAPI'

import avatar from '@assets/img/avatar.png'
import { useLocalStore } from '@stores/localStore'
const localStore = useLocalStore()
const route = useRoute()
const router = useRouter()

// 解决发现页面缓存路由信息的问题
const cat = ref('')
watch(
    () => route.query.cat,
    newVal => {
        if (newVal) {
            cat.value = newVal as string
        }
    }
)
// 下拉组件
const toggleShow = ref(false)
const type = ref(1)
const dropDownList = reactive([
    { type: 1, name: '设置', svgIcon: 'setting' },
    { type: 2, name: '退出登录', svgIcon: 'logout' },
    { type: 3, name: '登录', svgIcon: 'login' },
    { type: 4, name: 'GitHub', svgIcon: 'github' }
])
const list = computed(() => {
    if (localStore.loginStatus) {
        return dropDownList.filter(item => item.type !== 3)
    } else {
        return dropDownList.filter(item => item.type !== 2)
    }
})

const handlerDrop = async (item: { type: number; name: string }) => {
    console.log(item)
    if (item.type === 1) {
        router.replace('/')
        console.log('设置')
    }
    if (item.type === 2) {
        await localStore.handlerLogout()
        router.replace('/')
    }
    if (item.type === 3) {
        router.push('/login')
    }
    if (item.type === 4) {
        // window.open('https://www.baidu.com')
        router.push('/')
    }
}
</script>

<style scoped lang="postcss"></style>
