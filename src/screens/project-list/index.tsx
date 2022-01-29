import React, { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"
import { List } from './list'
import { useDebounce, useMount, cleanObject } from "utils"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProject } from "utils/project"
import { useUsers } from "utils/user"

export const ProjectListScreen = () => {




    const [param, setParam] = useState({
        name: '',
        personId: ''
    })




    const debouncedParam = useDebounce(param, 500)

    // 请求 列表数据
    const { isLoading, error, data: list } = useProject(debouncedParam)



    // 请求 user 数据
    const { data: users } = useUsers()


    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {
                error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
            }
            <List loading={isLoading} dataSource={list || []} users={users || []} />



        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
    padding-top: 1rem;
`