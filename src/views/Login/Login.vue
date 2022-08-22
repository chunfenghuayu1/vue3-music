<template>
    <div class="flex flex-col items-center my-8 space-y-4">
        <!-- logo -->
        <div class="w-24 h-24">
            <img src="@/../public/nest.png" />
        </div>
        <!-- 登录账号 -->
        <div class="font-bold text-xl">登录网易云账号</div>
        <!-- 二维码 -->
        <div>
            <img :src="qrcode" />
        </div>
        <!-- 切换登录方式 -->
        <div></div>
        <!-- 提示 -->
        <div></div>
    </div>
</template>

<script setup>
import QRCode from 'qrcode'
const { proxy } = getCurrentInstance()
const qrcode = ref('')
// 获取二维码
const getQRCode = async () => {
    try {
        // 获取unikey
        const { data } = await proxy.$http.reqLoginKey({ timestamp: +new Date() })
        if (data.code === 200) {
            const unikey = data.data.unikey
            // 获取qrurl
            const { data: res } = await proxy.$http.reqLoginQRCode({ key: unikey })
            if (res.code === 200) {
                // 获取qrcode图像
                const svg = await QRCode.toString(res.data.qrurl, {
                    width: 192,
                    margin: 0,
                    type: 'svg'
                })
                qrcode.value = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
            }

            // console.log(res2)
            // code.value = res2.data.data.qrurl
            // 此处进行登录状态检测
            // if (res2.code === 200) {
            // }
        }
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    getQRCode()
})
</script>

<style lang="postcss"></style>
