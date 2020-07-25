import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            margin: "5rem",
            paddingLeft: "5rem",
            paddingRight: "5rem",
            paddingBottom: "5rem",
            alignItems: "center",
            textAlign: "center",
        },
        header: {
            fontFamily: "Palatino",
        },
    })
);

export default function Confirmation() {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.header}>Thank you for your response :)</h1>
        </div>
    );
}
