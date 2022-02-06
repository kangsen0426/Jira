import { useAuth } from "context/auth-context";
import React, { useEffect, useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Dropdown, Menu, Button } from 'antd'
// 用 react 提供的方法将 svg 直接渲染
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

import { Navigate, Route, Routes, useNavigate } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { ProjectScreen } from "screens/project";
import { reseRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopOver } from "components/project-popover";
// 已登录 的 逻辑




export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false)



    let navigate = useNavigate();

    useEffect(() => {

        console.log("run route to projects");

        navigate('/projects')

    }, [])


    return (
        <Container>
            <PageHeader setProjectModalOpen={setProjectModalOpen}></PageHeader>
            <Main>
                {/* <BrowserRouter> */}
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen}/>}></Route>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
                </Routes>

                {/* </BrowserRouter> */}

            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}></ProjectModal>
        </Container>
    )
}

const PageHeader = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {



    return (
        <Header between={true}>
            <HeaderLeft gap={true} >
                <Button style={{ padding: 0 }} type="link" onClick={reseRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                </Button>
                <ProjectPopOver setProjectModalOpen={props.setProjectModalOpen} />
                <span>Logo</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { logout, user } = useAuth()

    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key={'logout'}>
                    <Button type="link" onClick={logout}>登出</Button>
                </Menu.Item>
            </Menu>
        }>
            <Button type="link" onClick={e => e.preventDefault()}>
                Hi, {user?.name}
            </Button>
        </Dropdown>
    )
}


const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr; 
    height: 100vh;
    grid-template-areas: 
    "header"
    "main" 
    ;
   
`

const Header = styled(Row)`
padding:3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
`

const Main = styled.main`
    grid-area: main;
  
`


const HeaderLeft = styled(Row)``


const HeaderRight = styled.div``


