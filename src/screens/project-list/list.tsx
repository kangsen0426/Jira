import { Table } from "antd"
import dayjs from "dayjs"
import { ListProps } from "interface"
import React from "react"
import { Link } from "react-router-dom"



export const List = ({ users, ...props }: ListProps) => {
    return (
        <Table rowKey={"id"} pagination={false} columns={[{
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