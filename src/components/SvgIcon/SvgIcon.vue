<template>
    <svg
        :class="['svg-icon', $attrs.class]"
        :style="{
            width: size + 'px',
            height: size + 'px'
        }"
        aria-hidden="true"
    >
        <use :xlink:href="'#icon-' + name" :fill="color" />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'SvgIcon',
    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: '#fff'
        },
        size: {
            type: [Number, String],
            default: 14
        }
    },
    setup() {
        return {}
    }
})
</script>

<style scoped lang="postcss">
.svg-icon {
    vertical-align: middle;
    fill: currentColor;
    stroke: currentColor;
}
</style>
