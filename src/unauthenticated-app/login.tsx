import React, { FormEvent } from 'react';
import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from "antd"
import styled from '@emotion/styled'
import { useAsync } from 'utils/use-async';




export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {

    const { isLoading, run } = useAsync()

    const { login } = useAuth()







    const handleSubmit = async (values: { username: string, password: string }) => {


        run(login(values).catch(error => {
            onError(error)
        }))


    }



    return (
        <Form name='login_form' onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder='请输入密码' type="password" id={'password'} />
            </Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>登录</LongButton>
        </Form>
    )
}

export const LongButton = styled(Button)`
    width: 100%;
`