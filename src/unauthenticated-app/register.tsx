import React, { FormEvent } from 'react';
import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from "antd"
import { LongButton } from './login'
import { useAsync } from 'utils/use-async';




export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {


    const { isLoading, run } = useAsync()

    const { register } = useAuth()

    const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {

        if (cpassword !== values.password) {
            onError(new Error("两次输入的密码不一致！"))
            return
        }

        run(register(values).catch(error => {
            onError(error)
        }))

    }



    return (
        <Form name='register_form' onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>

            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder='请输入密码' type="password" id={'password'} />
            </Form.Item>
            <Form.Item name='cpassword' rules={[{ required: true, message: '请确认密码' }]}>
                <Input placeholder='请确认密码' type="password" id={'cpassword'} />
            </Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton>
        </Form>
    )
}