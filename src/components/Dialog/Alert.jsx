import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function AlertBox(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState(false);

    const handleConfirmAsync = () => {
        props.confirm().then((response) => {
            if(response !== null) {
                setDeleted(true);
            } else {
                setError(true)
            }
        })
    }

    return (
        <div>
            <Dialog fullScreen={fullScreen} open={true}>
                <DialogTitle id="responsive-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.text}
                    </DialogContentText>
                    {!deleted && (
                        <Alert severity="error">
                            {'WARNING: This cannot be undone.'}
                        </Alert>
                    )}
                    {deleted && (
                        <Alert severity="success">
                            {'The operation was successful.'}
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="warning">
                            {'Sorry, we could not process the request. Pleas try again.'}
                        </Alert>
                    )}

                </DialogContent>
                <DialogActions>
                    {(!deleted && !error) && (
                        <Button autoFocus onClick={handleConfirmAsync} color="primary">
                            CONFIRM
                        </Button>
                    )}
                    <Button autoFocus onClick={props.close} color="primary">
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
