import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { convertDateToString } from "../../../utils/utils";

export default function EventFocused(props) {
    const handleClose = () => {
        props.handleClose();
    };

    const findBarber = (id) => {
        return props.barbers.find((barber) => barber.barber_id === id).name;
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle id="responsive-dialog-title">
                    Event Details
                </DialogTitle>
                <DialogContent className="split-content">
                    <div className="labels">
                        <DialogContentText>Barber:</DialogContentText>
                        <DialogContentText>Customer:</DialogContentText>
                        <DialogContentText>Service:</DialogContentText>
                        <DialogContentText>From:</DialogContentText>
                        <DialogContentText>End:</DialogContentText>
                    </div>
                    <div className="labels">
                        <DialogContentText>
                            {findBarber(props.event.barber_id)}
                        </DialogContentText>
                        <DialogContentText>{props.event.title}</DialogContentText>
                        <DialogContentText>{props.event.service}</DialogContentText>
                        <DialogContentText>
                            {convertDateToString(props.event.start)}
                        </DialogContentText>
                        <DialogContentText>
                            {convertDateToString(props.event.end)}
                        </DialogContentText>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
