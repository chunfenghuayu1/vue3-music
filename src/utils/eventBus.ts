type event = string
type callback = (...args: any) => void
type args = any

class EventBus {
    private eventMap = new Map()
    constructor() {}
    // 注册事件
    public $on(event: event, callback: callback) {
        if (!this.eventMap.has(event)) {
            this.eventMap.set(event, [])
        }
        this.eventMap.get(event).push(callback)
    }
    // 触发事件
    public $emit(event: event, ...args: args) {
        if (this.eventMap.has(event)) {
            this.eventMap.get(event).forEach((listener: callback) => listener(...args))
        }
    }
    // 注销事件
    public $off(event: event, callback?: callback) {
        if (this.eventMap.has(event)) {
            if (callback) {
                this.eventMap.set(
                    event,
                    this.eventMap.get(event).filter((listener: callback) => listener !== callback)
                )
            } else {
                this.eventMap.delete(event)
            }
        }
    }
    // 执行一次
    public $once(event: event, callback: callback) {
        // 包装callback为一次执行就注销
        const once = (...args: args) => {
            callback(...args)
            this.$off(event, once)
        }
        this.$on(event, once)
    }
}
const bus = new EventBus()

export default bus
