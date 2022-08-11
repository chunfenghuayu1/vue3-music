<template>
    <nav class="nav filter">
        <div class="flex flex-1 bg-orange-300 items-center">
            <SvgIcon icon-name="logo" icon-size="48"></SvgIcon>
            <SvgIcon icon-name="back" icon-size="24"></SvgIcon>
            <SvgIcon icon-name="forward" icon-size="24"></SvgIcon>
        </div>
        <div class="flex flex-grow justify-center bg-red-300">2</div>
        <div class="flex flex-1 justify-end bg-blue-300">3</div>
    </nav>
</template>

<script setup></script>

<style lang="postcss">
.nav {
    @apply fixed top-0 left-0 h-16 flex w-full min-w-0 bg-slate-100;
    padding-left: 10vw;
    padding-right: 10vw;
    backdrop-filter: saturate(180%) blur(20px);
}
</style>
