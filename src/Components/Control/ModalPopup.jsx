import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import { confirmationPopupMessages } from '../../Constants/errorMessage';
import PropTypes from "prop-types";


export const ModalPopup = (props) => {
  const { isPopupOpen, cancelHandlePopup, submitHandlePopup, deleteName  } = props;
  return (
    <React.Fragment>
      <Dialog
        open={isPopupOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmationPopupMessages.delete} <b> {deleteName} </b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelHandlePopup}
            color="primary">
            Close
          </Button>
          <Button
            onClick={submitHandlePopup}
            color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  )
}

ModalPopup.propTypes = {
  deleteName: PropTypes.string,
  isPopupOpen: PropTypes.bool.isRequired,
  cancelHandlePopup: PropTypes.func.isRequired,
  submitHandlePopup:PropTypes.func.isRequired
};

ModalPopup.defaultProps = {
  deleteName: ""
}
