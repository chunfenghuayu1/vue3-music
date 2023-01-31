import Request from './axios'
import { IS_ELECTRON } from '@/utils/electron/myAPI'
let baseURL = ''
if (IS_ELECTRON) {
    // baseURL = import.meta.env.DEV ? 'http://127.0.0.1:15452' : import.meta.env.VITE_APP_BASE_API
    baseURL = import.meta.env.VITE_APP_BASE_API
} else {
    baseURL = import.meta.env.VITE_APP_BASE_API
}
// 配置项
const config = {
    // 基础路径
    baseURL,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    // 请求超时
    timeout: 5000
}

export default new Request(config)
