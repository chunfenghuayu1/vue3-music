import axios from 'axios'

const request = axios.create({
    // 基础路径
    baseURL: '',
    // 请求超时
    timeout: 6000
})

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

// 二次封装axios
export default ({ url, method = 'get', params = {}, data = {}, headers = {} }) => {
    return request({
        url,
        method,
        params,
        data,
        headers
    })
}
