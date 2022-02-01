import { Table } from "antd"
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
            },]} {...props}>
        </Table>

    )
}