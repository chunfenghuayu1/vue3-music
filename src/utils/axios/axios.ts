import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
    CancelTokenStatic
} from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
class Request {
    // axios实例
    private instance: AxiosInstance
    // 取消请求
    private cancelToken: CancelTokenStatic = axios.CancelToken
    private pending: Array<{ url: string; cancel: Function }> = []

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.requestInterceptor()
        this.responseInterceptor()
    }
    // 请求拦截器
    private requestInterceptor() {
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                this.removePending(config)
                config.cancelToken = new this.cancelToken((c: any) => {
                    this.pending.push({
                        url: `${config.url}/${JSON.stringify(config.data)}&request_type=${
                            config.method
                        }/${JSON.stringify(config.params)}`,
                        cancel: c
                    })
                })
                // 处理请求头逻辑
                const token = ''
                if (token) {
                    if (config && config.headers) {
                        config.headers['Athorization'] = 'Bearer ' + ''
                    }
                }
                // this.requestLog(config)
                return config
            },
            (error: AxiosError) => {
                // 对错误做些什么
                return Promise.reject(error)
            }
        )
    }
    // 响应拦截器
    private responseInterceptor() {
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                this.removePending(res.config)
                // 处理响应码逻辑
                return res.data
            },
            (error: AxiosError) => {
                // 提示错误
                // console.log(error.response?.status)

                ElMessage({
                    message: error as any,
                    type: 'error',
                    duration: 1000
                })

                return Promise.reject(error)
            }
        )
    }
    // 取消重复请求
    private removePending(config: AxiosRequestConfig): void {
        this.pending.map((item, index) => {
            if (
                item.url ===
                `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`
            ) {
                item.cancel()
                this.pending.splice(index, 1)
            }
            return item
        })
    }
    private request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config)
    }
    get<T = any>({ url, params, data, headers }: AxiosRequestConfig): Promise<T> {
        return this.request({ url, method: 'GET', params, data, headers })
    }
    post<T = any>({ url, params, data, headers }: AxiosRequestConfig): Promise<T> {
        return this.request({ url, method: 'POST', params, data, headers })
    }
    put<T = any>({ url, params, data, headers }: AxiosRequestConfig): Promise<T> {
        return this.request({ url, method: 'PUT', params, data, headers })
    }
    delete<T = any>({ url, params, data, headers }: AxiosRequestConfig): Promise<T> {
        return this.request({ url, method: 'DELETE', params, data, headers })
    }
}
export default Request
