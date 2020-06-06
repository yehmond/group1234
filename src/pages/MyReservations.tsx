import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PassReservations from "./../components/PassReservations";
import CurrentReservation from "./../components/CurrentReservation";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: "3rem",
            paddingTop: "3rem",
            alignItems: "center",
            textAlign: "center",
        },
        hLine: {
            width: "50%",
            marginLeft: "17.5rem",
            marginTop: "4rem",
        },
    })
);

export default function MyReservations(): JSX.Element {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <h1>My Reservations</h1>
            <hr className={classes.hLine}></hr>

            <CurrentReservation />
            <PassReservations />
        </div>
    );
}
