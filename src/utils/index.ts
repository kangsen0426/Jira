import { useEffect, useState } from "react"



export const useDebounce = <V>(value: V, delay?: number): any => {

    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {

        // 每次在 value 变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)

        // 每次在 上一个 useEffect 处理完后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])


    return debouncedValue

}

export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === "";


// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
    // Object.assign({}, object)
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
};


// callback 在 组件挂载时执行一次便销毁
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();

        // TODO  依赖项里加上 callback 会造成无限循环，这个和 useCallbsck 和 useMemo 有关系
         
    }, []);
};
