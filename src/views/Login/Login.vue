<template>
    <div class="flex flex-col items-center my-8">
        <!-- logo -->
        <div class="w-24 h-24 mb-4">
            <img src="/nest.png" />
        </div>
        <!-- 登录账号 -->
        <div class="font-bold text-xl mb-10">登录网易云账号</div>
        <!-- 二维码 -->
        <div class="flex flex-col items-center space-y-4">
            <div class="bg-gray-100 p-6 rounded-xl">
                <img :src="qrcode" class="w-48 h-48" />
            </div>
            <p>{{ notify }}</p>
        </div>
        <!-- 切换登录方式 -->
        <div class="mt-5">
            <p class="text-sm text-gray-500 hover:underline hover:cursor-pointer">手机号登录</p>
        </div>
        <!-- 提示 -->
        <div class="mt-10 text-xs text-gray-400">
            本网站不获取并且不使用用户任何数据，只用作数据展示
        </div>
    </div>
</template>

<script setup>
import QRCode from 'qrcode'
import { useStorageStore } from '@/store/Storage.js'
import { useMySongs } from '@/store/MySongs.js'
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const storageStore = useStorageStore()
const MySongs = useMySongs()
const qrcode = ref('/img_loading.gif')
const unikey = ref('')
const notify = ref('打开网易云音乐APP扫码登录')
// 获取二维码
const getQRCode = async () => {
    try {
        // 获取unikey
        const { data } = await proxy.$http.reqLoginKey({ timestamp: +new Date() })
        if (data.code === 200) {
            unikey.value = data.data.unikey
            // 获取qrurl
            const { data: res } = await proxy.$http.reqLoginQRCode({ key: unikey.value })
            if (res.code === 200) {
                // 获取qrcode图像
                const svg = await QRCode.toString(res.data.qrurl, {
                    width: 192,
                    margin: 0,
                    color: {
                        dark: '#63BBD0',
                        light: '#00000000'
                    },
                    type: 'svg'
                })
                qrcode.value = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
            }
            checkQRCodeLogin()
        }
    } catch (error) {
        proxy.$message({
            message: error,
            type: 'error'
        })
    }
}
// 轮询接口，验证用户是否登录
const loginInterval = ref(null)
const checkQRCodeLogin = () => {
    if (unikey.value === '') return
    loginInterval.value = setInterval(() => {
        proxy.$http.reqLoginCheck({ key: unikey.value, timestamp: +new Date() }).then(res => {
            if (res.data.code === 801) {
                notify.value = '打开网易云音乐APP扫码登录'
            } else if (res.data.code === 800) {
                notify.value = '二维码已失效，请重新扫码'
                // 重新获取二维码
                getQRCode()
                clearInterval(loginInterval.value)
                loginInterval.value = null
            } else if (res.data.code === 802) {
                notify.value = '扫描成功，请在手机上确认登录'
            } else if (res.data.code === 803) {
                notify.value = '登录成功'
                // 清除定时器
                clearInterval(loginInterval.value)
                loginInterval.value = null
                // 登录成功后处理的事件
                afterLogin()
            }
        })
    }, 1000)
}

// 处理登录成功后的事件
const afterLogin = async () => {
    // 本地存储更改用户登录状态,获取用户信息
    await updateData()
    // 获取路由参数
    const query = route.query.redirect
    query ? router.replace(query) : router.go(0)
}
// 刷新数据
const updateData = async () => {
    await storageStore.getUserInfo()
    MySongs.initMySong()
}
onMounted(() => {
    getQRCode()
})
onBeforeUnmount(() => {
    clearInterval(loginInterval.value)
})
</script>

<style lang="postcss"></style>
