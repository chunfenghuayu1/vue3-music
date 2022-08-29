<template>
    <div class="flex flex-1 items-center lg:space-x-0 space-x-8">
        <div class="cursor-pointer" @click="handler">
            <SvgIcon name="logo" size="48" class="lg:hidden"></SvgIcon>
        </div>

        <div class="flex space-x-4 lg:space-x-2">
            <button class="btn m-1 p-2" @click="$router.go(-1)">
                <SvgIcon name="back" size="20" class=""></SvgIcon>
            </button>
            <button class="btn m-1 p-2" @click="$router.go(1)">
                <SvgIcon name="forward" size="20"></SvgIcon>
            </button>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const handler = () => {
    if (route.path === '/') {
        router.go(0)
    } else {
        router.push({ path: '/' })
    }
}
</script>

<style lang="postcss"></style>
