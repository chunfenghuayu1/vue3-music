<template>
    <div class="flex flex-1 items-center justify-end min-w-max space-x-5">
        <SearchInput></SearchInput>
        <SwitchTheme></SwitchTheme>
        <el-avatar
            v-if="storageStore.data.loginMode === ''"
            fit="cover"
            class="select-none cursor-pointer"
            @click="$router.push('/login')"
        >
            登录
        </el-avatar>
        <el-avatar
            v-else
            fit="cover"
            class="select-none cursor-pointer"
            :src="`${storageStore.avatarUrl}?param=40y40`"
        ></el-avatar>
        <!--  v-if="storageStore.data.loginMode !== ''" -->
        <div v-if="false" class="select-none" @click="loginout">退出登录</div>
    </div>
</template>

<script setup>
import { useStorageStore } from '@/store/Storage.js'
const storageStore = useStorageStore()
const router = useRouter()
const loginout = async () => {
    await storageStore.handlerLogout()
    router.go(0)
}
</script>

<style lang="postcss"></style>
