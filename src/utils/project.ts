import { Project } from "interface";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useProject = (param?: Partial<Project>) => {

    // 服务
    const client = useHttp()

    const { run, ...result } = useAsync<Project[]>()



    // 请求 list 数据
    useEffect(() => {

        run(client('/projects', { data: cleanObject(param || {}) }))

    }, [param])

//  console.log(result);
 

    return result
}