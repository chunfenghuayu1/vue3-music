import Request from './axios'

// 配置项
const config = {
    // 基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    // 请求超时
    timeout: 3000
}

export default new Request(config)
