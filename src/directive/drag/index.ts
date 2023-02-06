/**
 * https://github.com/sunzsh/vue-el-demo/blob/master/src/main.js
 */
import type { Directive } from 'vue'
const Drag: Directive = {
    mounted(el: HTMLElement) {
        let target = el // 当前元素
        // 元素本身不是绝对定位 且 元素不是body 且 元素的父元素存在
        // 当鼠标按下时，查找上层第一个为absolute定位dom
        while (
            window.getComputedStyle(target).position !== 'absolute' &&
            target !== document.body &&
            target.parentElement
        ) {
            target = target.parentElement
        }

        // 获取目标元素宽高
        const w = target.offsetWidth
        const h = target.offsetHeight
        // 限定边界
        const limit = 20
        // 获取窗口大小
        let winWidth = document.documentElement.clientWidth
        let winHeight = document.documentElement.clientHeight
        const navHeight = document.getElementsByTagName('nav')[0].offsetHeight

        window.onresize = () => {
            // 复制值
            const width = winWidth
            winWidth = document.documentElement.clientWidth
            winHeight = document.documentElement.clientHeight

            // 控制窗口变化
            const l = target.offsetLeft

            // 控制移动边界
            // 改变前判断
            if (l <= width / 2) {
                target.style.left = limit + 'px'
            } else {
                target.style.left = winWidth - w - limit + 'px'
            }
            // 窗口改变后移动到底部
            target.style.top = winHeight - h - limit + 'px'
        }

        el.onmousedown = e => {
            // 禁止选中文字
            document.onselectstart = () => {
                return false
            }

            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - target.offsetLeft
            const disY = e.clientY - target.offsetTop

            document.onmousemove = e => {
                // 通过事件委托，计算移动的距离
                // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
                const l = e.clientX - disX
                const t = e.clientY - disY

                // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
                target.style.left = l + 'px'
                target.style.top = t + 'px'
            }
            document.onmouseup = () => {
                const l = target.offsetLeft
                const t = target.offsetTop

                // 控制移动边界
                if (l < 0) {
                    target.style.left = limit + 'px'
                }
                if (l >= winWidth - w - limit) {
                    target.style.left = winWidth - w - limit + 'px'
                }
                if (t < navHeight) {
                    target.style.top = navHeight + limit + 'px'
                }
                if (t >= winHeight - h) {
                    target.style.top = winHeight - h - limit + 'px'
                }
                document.onmousemove = null
                document.onmouseup = null
                document.onselectstart = null
            }
            // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
            return false
        }
    }
}

export default Drag
