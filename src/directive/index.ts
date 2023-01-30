import type { App } from 'vue'
import Drag from './drag'
export default {
    install(app: App) {
        app.directive('drag', Drag)
    }
}
