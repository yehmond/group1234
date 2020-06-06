import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PassReservations from "../components/Reservation/PastReservations";
import CurrentReservation from "../components/Reservation/CurrentReservation";

const useStyles = makeStyles(() =>
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

export default function MyReservations() {
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
