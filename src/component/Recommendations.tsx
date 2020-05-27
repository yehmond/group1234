import React from "react";
import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        background: theme.palette.primary.dark,
        minHeight: "10rem",
        padding: " 3rem 5rem",
    },
    title: {
        color: theme.palette.primary.contrastText,
    },
}));

export default function Recommendations(): JSX.Element {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Available Now</h1>
            <h1 className={classes.title}>Recommendations For You</h1>
        </div>
    );
}
