import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));
export default function SignUpSuccessful() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h1>Sign Up Successful</h1>
            <br />
            <p>Please sign in to continue</p>
        </div>
    );
}
