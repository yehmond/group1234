import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { convertDateToString } from "../../utils/utils";

export default function ReservationFocused(props) {
    const handleConfirm = () => {
        props.handleClose();
    };

    return (
        <div>
            <Dialog open={true}>
                <DialogTitle id="responsive-dialog-title">Details</DialogTitle>
                <DialogContent className="split-content">
                    <div className="labels">
                        <DialogContentText>Barber:</DialogContentText>
                        <DialogContentText>Service:</DialogContentText>
                        <DialogContentText>From:</DialogContentText>
                        <DialogContentText>Duration:</DialogContentText>
                    </div>
                    <div className="labels">
                        <DialogContentText>{props.barberName}</DialogContentText>
                        <DialogContentText>{props.service}</DialogContentText>
                        <DialogContentText>
                            {convertDateToString(props.slot)}
                        </DialogContentText>
                        <DialogContentText>{props.duration}</DialogContentText>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleConfirm} color="primary">
                        CONFIRM
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
