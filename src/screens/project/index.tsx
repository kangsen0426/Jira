import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Navigate, Routes, Route, useNavigate } from "react-router"
import { KanbanScreen } from "screens/kanban"
import { EpicScreen } from "screens/epic"

export const ProjectScreen = () => {

    let navigate = useNavigate();

    useEffect(() => {
        navigate('kanban')
    }, [])

    return (
        <div>
            <h1>Project</h1>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path={"/kanban"} element={<KanbanScreen />}></Route>
                <Route path={"/epic"} element={<EpicScreen />}></Route>
            </Routes>
        </div>
    )
}