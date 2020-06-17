import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import TimerIcon from "@material-ui/icons/Timer";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        margin: "1rem 0",
    },
    media: {
        height: 300,
        width: 150,
        margin: 5,
        position: "relative",
        display: "grid",
        alignSelf: "center",
        justifySelf: "center",
    },
    content: {
        display: "grid",
        gridTemplateRows: "auto auto auto auto auto",
        gridRowGap: "5px",
        alignItems: "center",
        justifyContent: "center",
    },
    time: {
        display: "grid",
        gridTemplateColumns: "auto auto 8fr",
        gridColumnGap: "5px",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        display: "grid",
        alignSelf: "center",
        justifySelf: "center",
        width: "80%",
    },
}));

export default function BarberCard(props) {
    const classes = useStyles();
    const authState = useSelector((state) => state.authState);
    const role = authState.role;
    console.log(authState);

    return (
        <Card className={classes.root}>
            <CardMedia image={props.barber.picture} className={classes.media} />
            <CardContent className={classes.content}>
                <Typography variant="h2">{props.barber.name}</Typography>
                <p>{props.barber.description}</p>
                <div>
                    {props.barber.specialties.map((service) => {
                        return (
                            <Chip label={service} color="primary" key={service} />
                        );
                    })}
                </div>
                <div className={classes.time}>
                    <TimerIcon />
                    <span>{props.barber.timeslot}</span>
                </div>
                <div>
                    {role === "CUSTOMER" && (
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                        >
                            Make Reservation
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
