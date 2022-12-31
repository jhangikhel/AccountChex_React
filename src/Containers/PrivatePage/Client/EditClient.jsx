import { Button, Modal } from "@material-ui/core";
import React from "react";
import AddClient from "./AddClient";

const EditClient = ({ clientId }) => {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const setPersonalInfo = (panelName, objPersonalInfo) => {
        setExpanded(panelName);
        setpersonalInfoData(objPersonalInfo);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddClient clientId={clientId} setPersonalInfo={setPersonalInfo}></AddClient>

            </Modal>
        </div >
    );
};

export default EditClient;
