import { Dropdown, Menu, Table, Button } from "antd"
import { Pin } from "components/pin"
import dayjs from "dayjs"
import { ListProps } from "interface"
import React from "react"
import { Link } from "react-router-dom"
import { useEditProject } from "utils/project"



export const List = ({ users, ...props }: ListProps) => {

    const { mutate } = useEditProject()




    return (
        <Table rowKey={"id"} pagination={false} columns={[
            {
                title: <Pin checked={true} disabled={true} />,
                render(value, project) {
                    return <Pin checked={project.pin} onCheckedChange={(pin) => {


                        mutate({ id: project.id, pin }).then(props.refresh)
                    }} />
                }
            },
            {
                title: '名称',
                // 根据 名字排序
                sorter: (a, b) => a.name.localeCompare(b.name),

                render(value, project) {
                    return <div>
                        <Link to={project.id + ''}>{project.name}</Link>
                    </div>
                }

            }, {
                title: '部门',
                dataIndex: 'organization',
            }, {
                title: '负责人',
                render(value, project) {

                    return <span>
                        {users.find(user => user.id === project.personId)?.name || '未知'}
                    </span>

                }
            }, {
                title: '创建时间',
                render(value, project) {
                    return (
                        <span>
                            {
                                project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'
                            }
                        </span>
                    )
                }
            },
            {
                render(value, project) {
                    return (
                        <Dropdown overlay={<Menu>
                            <Menu.Item key={'edit'}>
                                <Button type="link" onClick={() => props.setProjectModalOpen(true)} >编辑</Button>
                            </Menu.Item>
                        </Menu>}>
                            <Button type="link" onClick={() => props.setProjectModalOpen(true)} >...</Button>

                        </Dropdown>
                    )
                }
            }]} {...props}>
        </Table>

    )
}