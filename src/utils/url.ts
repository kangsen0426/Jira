
import { useSearchParams } from "react-router-dom"



/*
    返回 页面 url 中 指定键的参数值
*/
export const useUrlQueryParam = (keys: string[]) => {

    const [searchParams, setSearchParams] = useSearchParams()

    return [
        keys.reduce((prev: object, key: string) => {

            return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in string]: string }),
        setSearchParams
    ] as const



}