import axios, {
    AxiosError,
    type InternalAxiosRequestConfig,
    type AxiosInstance,
    type AxiosResponse
  } from 'axios'
import { useUserStore } from '@/stores/user'


  const base_url = import.meta.env.VITE_BASE_URL
  const request_timeout = import.meta.env.VITE_REQUEST_TIMEOUT

  // 创建axios实例
  const service: AxiosInstance = axios.create({
    baseURL: base_url, // api 的 base_url
    timeout: request_timeout, // 请求超时时间
    withCredentials: false // 禁用 Cookie
  })

  /**
   * 请求拦截器
   */
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 配置请求头
      const userStore = useUserStore()
      const token = userStore.token
      config.headers.authorization = token
      return config
    },
    (error: AxiosError) => {
      console.error('网络错误:'+error)
      return Promise.reject(error)
    }
  )
  /**
   * 响应拦截器
   */
  service.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      // 响应处理，如状态码
      return response
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  export { service }
