import { State, defaultConfig } from "interface"
import { useState } from "react"


const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}


export const useAsync = <D>(initialState?: State<D>, initiaConfig?: defaultConfig) => {


    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState
    })

    const [retry, setRetry] = useState(() => () => {

    })

    const setData = (data: D) => {

        setState({
            data,
            stat: 'success',
            error: null
        })
    }

    const setError = (error: Error) => setState({
        error,
        data: null,
        stat: 'error'
    })

    // run 用来触发异步请求
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error("请传入 Promise 类型数据")
        }

        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry())
            }
        })

        // 设置 loading
        setState({ ...state, stat: 'loading' })

        return promise.then(data => {



            setData(data)
            // console.log("**", data);

            return data
        }).catch(error => {

            setError(error)

            if (initiaConfig?.throwOnError) {

                return Promise.reject(error)
            }
            return error
        })

    }



    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        retry,
        ...state
    }

}