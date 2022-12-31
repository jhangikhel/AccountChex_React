import { Button, Modal } from "@material-ui/core";
import React from "react";
import AddVendor from "./AddVendor";

const EditVendor = ({ vendorId }) => {
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
                <AddVendor vendorId={vendorId} setPersonalInfo={setPersonalInfo}></AddVendor>

            </Modal>
        </div >
    );
};

export default EditVendor;
