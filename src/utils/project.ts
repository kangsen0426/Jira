import { Project } from "interface";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useProject = (param?: Partial<Project>) => {

    // 服务
    const client = useHttp()

    const { run, ...result } = useAsync<Project[]>()

    const fetchProjects = () => client('/projects', { data: cleanObject(param || {}) })

    // 请求 list 数据
    useEffect(() => {

        run(
            fetchProjects(), {
            retry: fetchProjects
        }
        )

    }, [param])

    //  console.log(result);


    return result
}

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {


        return run(client(`/projects/${params.id}`, {
            data: params,
            method: "PATCH"
        }))

    }

    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {

        return run(client(`projects/${params.id}`, {
            data: params,
            method: "POST"
        }))

    }

    return {
        mutate,
        ...asyncResult
    }
}


