import React from "react";
import { useProject } from "utils/project";
import { Typography, List, Popover, Divider, Button } from 'antd'
import styled from "@emotion/styled";

export const ProjectPopOver = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {

    const { data: projects, isLoading } = useProject()
    const pinnedProjects = projects?.filter(project => project.pin)

    const content = <ContentContainer>
        <Typography.Text type="secondary">收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider></Divider>
        <Button onClick={() => props.setProjectModalOpen(true)} style={{ padding: 0 }} type="link">创建项目</Button>
    </ContentContainer>

    return <Popover placement={"bottom"} content={content}><span>项目</span></Popover>

}

const ContentContainer = styled.div`
    min-width: 30rem;
`

