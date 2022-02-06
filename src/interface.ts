import { TableProps } from "antd";

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    token: string;
    organization: string;
}


export interface AuthForm {
    username: string;
    password: string;
}


// http 的数据格式
export interface httpConfig extends RequestInit {
    data?: object,
    token?: string
}


export interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelProps['param']) => void
}

export interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string,
    created: number
}

export interface ListProps extends TableProps<Project> {
    users: User[],
    refresh?: () => void,
    setProjectModalOpen: (isOpen: boolean) => void
}


export interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}


// 封装的 run 是否抛出 异常 能被 外部 try cath 接受到的配置
export interface defaultConfig {
    throwOnError: boolean
}
