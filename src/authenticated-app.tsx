import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Dropdown, Menu, Button } from 'antd'
// 用 react 提供的方法将 svg 直接渲染
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

// 已登录 的 逻辑


export const AuthenticatedApp = () => {
    const { logout, user } = useAuth()

    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true} >
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                    <h3>Logo</h3>
                    <h3>Logo</h3>
                </HeaderLeft>
                <HeaderRight>
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
                </HeaderRight>
            </Header>

            <Main>
                <ProjectListScreen />
            </Main>

        </Container>
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


