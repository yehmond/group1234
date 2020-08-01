import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { refreshPage } from "../../utils/utils";

export default function DialogMessage(props) {
    const history = useHistory();

    const handleClose = () => {
        history.push(props.link);
        props.refresh && refreshPage();
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle id="responsive-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{props.text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
