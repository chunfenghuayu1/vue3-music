<template>
    <svg aria-hidden="true" class="svg-icon" :style="{ width: size + 'px', height: size + 'px' }">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script>
export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {
            type: String,
            default: 'icon'
        },
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: '#fff'
        },
        size: {
            type: String,
            default: '14'
        }
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`)
        return { symbolId }
    }
})
</script>

<style lang="postcss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    stroke: currentColor;
    vertical-align: middle;
}
</style>
