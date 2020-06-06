import React from "react";
import { Theme, makeStyles } from "@material-ui/core";

type StoreDescription = {
    description: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    outline: {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.4rem",
        padding: "1.5rem",
        margin: "2%",
        width: "90%",

    },
    container: {
        backgroundColor: "rgba(255,255,255,0.8)",
        width: "100%"
    },
    descriptionContainer: {
        padding: "0.1rem"
    },
    description: {
        width: "50%",
        textAlign: "left",
        margin: "3%",
        fontSize: "1rem",
    },
}));

export default function StoreDescription({
    description,
}: StoreDescription): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.outline}>
            <div className={classes.container}>
                <div className={classes.descriptionContainer}>
                    <h3 className={classes.description}>{description}</h3>
                </div>
            </div>
        </div>
    );
}
