import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

// template taken from https://material-ui.com/getting-started/templates/dashboard/
export default function TotalReservations(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Total Reservations</Title>
            <Typography component="p" variant="h4">
                {props.reservations.length}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                reservations
            </Typography>
        </React.Fragment>
    );
}
