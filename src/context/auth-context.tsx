import React, { useState, ReactNode } from 'react'

import * as auth from 'auth-provider'
import { AuthForm, User } from 'interface'
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from "components/lib"

// 初始化 user 的函数

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken()
    // const token = window.sessionStorage.getItem('__auth_provider_token__')
    console.log(token);
    if (token) {
        // 说明已经在登录状态
        const data = await http('/me', { token })
        // const data = await fetch('')
        // console.log(data);

        user = data.user
    }



    return user
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const { data: user, setData: setUser, error, isIdle, isError, isLoading, run } = useAsync<User | null>()




    // 这里的 login 和 privder 的login 不是一个 login'
    const login = (form: AuthForm) => auth.login(form).then(user => {
        setUser(user)
    })

    const register = (form: AuthForm) => auth.register(form).then(user => {
        setUser(user)
    })

    const logout = () => auth.logout().then(() => {
        setUser(null)
    })

    useMount(() => {
        run(bootstrapUser())
    })

    if (isIdle || isLoading) {
        return <FullPageLoading></FullPageLoading>
    }

    if (isError) {
        return <FullPageErrorFallback error={error}></FullPageErrorFallback>
    }





    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />

}


export const useAuth = () => {

    const context = React.useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth 必需在AuthProvider中使用')
    }

    return context

}