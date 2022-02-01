
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
import { httpConfig } from "interface"
import qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL



export const http = async (endpoint: string, { data, token, headers, ...customConfig }: httpConfig = {}) => {

    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig


    }

    
    

    // 区分 get post 的传参方式
    if (config.method.toUpperCase() === "GET") {
        // 参数拼接在 url 
        endpoint += `?${qs.stringify(data)}`
    } else {

        //参数放入 body 里面
        config.body = JSON.stringify(data || {})
    }

    // console.log(apiUrl + endpoint, config);


    return window.fetch(`${apiUrl}${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {

                // 401 时 推出登录
                auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })


            }

            const data = await response.json()

            if (response.ok) {
                return data
            } else {

                // 由于 fetch 在 服务器返回 非 200 状态码时并不会抛出异常，因此
                // 我们需要手动 reject 


                return Promise.reject(data)
            }

        })
}


// 对 http 再 封装一层 自动获取 token 补齐

export const useHttp = () => {
    const { user } = useAuth()

    //   Parameters<typeof http>  获取 http 的参数类型 赋值到前面

    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}