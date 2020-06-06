import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

type StoreId = {
    id: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    outline: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.4rem",
        padding: "1.5rem",
        margin: "2%",
        width: "90%",
        height: "20rem",
    },
    container: {
        backgroundColor: "rgba(255,255,255,0.8)",
        width: "100%",
        height: "100%",
    },
    reviewContainer: {
        padding: "0.1rem",
    },
}));

export default function StoreReviews({ id }: StoreId): JSX.Element {
    const classes = useStyles();
    return (
        <>
            <div className={classes.outline}>
                <div className={classes.container}>
                    <div className={classes.reviewContainer}>
                        {id}
                    </div>
                </div>
            </div>
        </>
    );
}
