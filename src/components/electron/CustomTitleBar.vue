<template>
    <div
        class="h-8 w-full fixed top-0 text-theme-base flex items-center justify-between select-none"
        style="-webkit-app-region: drag"
        v-if="IS_ELECTRON"
    >
        <div class="pl-6 select-none font-semibold">Music</div>
        <div class="flex justify-center items-center h-full" style="-webkit-app-region: no-drag">
            <div
                class="w-12 h-full !flex justify-center items-center hover:bg-theme-baseSecond codicon codicon-chrome-minimize"
                @click="minWindow"
            ></div>
            <div
                class="!flex w-12 h-full justify-center items-center hover:bg-theme-baseSecond codicon"
                :class="isMaximized ? 'codicon-chrome-restore' : 'codicon-chrome-maximize'"
                @click="maxOrUnmaxWindow"
            ></div>
            <div
                class="w-12 h-full !flex justify-center items-center hover:bg-red-600 codicon codicon-chrome-close"
                @click="closeWindow"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@vscode/codicons/dist/codicon.css'
import { useMyAPI, IS_ELECTRON } from '@/utils/electron/myAPI'
const { minWindow, maxOrUnmaxWindow, closeWindow, isMaximize } = useMyAPI()

const isMaximized = ref(false)

isMaximize((e, arg) => {
    isMaximized.value = arg
})
</script>

<style></style>
