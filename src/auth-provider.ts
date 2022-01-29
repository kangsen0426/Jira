
import { User } from './interface'

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)
export const getToken2 = () => {

    return "MjA4NzYyODEwMg=="  //window.sessionStorage.getItem('__auth_provider_token__')

}
export const handleUserResponse = ({ user }: { user: User }) => {

    // 保存用户 token 信息
    window.localStorage.setItem(localStorageKey, user.token || "")


    // 自己存一下
    window.sessionStorage.setItem(localStorageKey, user.token || '')
    // console.log(window.sessionStorage.getItem('__auth_provider_token__'));


    return user

}


// 返回用户登录信息

export const login = (data: { username: string, password: string }) => {

    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) => {

        if (response.ok) {

            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(await response.json())
        }

    })






}

// 返回用户注册信息
export const register = (data: { username: string, password: string }) => {

    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) => {

        if (response.ok) {

            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(await response.json())

        }

    })



}

export const logout = async () => {
    window.localStorage.removeItem(localStorageKey)
}