import type { Ref } from 'vue'
import { round } from 'lodash-es'

export function useSlider(initValue: Ref<number>) {
    const x = initValue
    // 自定义获取鼠标点击状态
    const flag = ref(false)
    const handleSlide = (e: MouseEvent) => {
        const mouseX = e.clientX
        const x2 = x.value
        const speed = (e.target as HTMLElement).parentElement?.offsetWidth!

        document.onmousemove = e => {
            flag.value = true

            x.value = round(x2 + (e.clientX - mouseX) / speed, 3)

            if (x.value >= 1) {
                x.value = 1
            }
            if (x.value <= 0) {
                x.value = 0
            }
        }
        document.onmouseup = () => {
            flag.value = false
            document.onmousemove = null
        }
    }

    return { x, handleSlide, flag }
}
