import React from "react";
import { Drawer, Button } from "antd";



export const ProjectModal = (props: { projectModalOpen: boolean, onClose: () => void }) => {


    return (
        <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'}>
            <h1>modal</h1>
            <Button onClick={props.onClose}></Button>
        </Drawer>
    )

}


