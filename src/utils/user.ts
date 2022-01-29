import { User } from "interface";
import { useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";



export const useUsers = (param?: Partial<User>) => {

    const client = useHttp()

    const { run, ...result } = useAsync<User[]>(undefined,{throwOnError:true})

    useMount(() => {
        run(client('/users'))
    })

    return result
}