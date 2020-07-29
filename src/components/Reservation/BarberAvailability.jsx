import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { dateToTime, isMobile } from "../../utils/utils";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import ReservationFocused from "./ReservationFocused";
import { registerReservation } from "../../api/customer";
import DialogMessage from "../Dialog/Dialog";

const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        margin: "2rem",
        // eslint-disable-next-line
        ["@media (max-width:1000px)"]: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1f 1fr",
        },
    },
    media: {
        height: 150,
        width: 100,
        margin: 5,
        position: "relative",
        display: "grid",
        alignSelf: "center",
        justifySelf: "center",
    },
    content: {
        display: "grid",
        gridRowGap: "5px",
    },
    chip: {
        margin: "5px",
        // eslint-disable-next-line
        ["@media (max-width:1000px)"]: {
            margin: "2.5px",
        },
    },
}));

export default function BarberAvailability(props) {
    const classes = useStyles();
    const [select, setSelect] = useState(null);
    const [from, setFrom] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const bookReservation = () => {
        registerReservation(
            window.localStorage.getItem('id'),
            props.storeID,
            props.barber.barber_id,
            new Date(from),
            props.service
        ).then((response) => {
            response ? setSuccess(true) : setError(true);
        })
    }

    useEffect(() => {
        from ? setSelect(true) : setSelect(false);
    },[from])

    return (
        <>
            <Card raised className={classes.root}>
                <CardMedia image={props.barber.picture} className={classes.media} />
                <CardContent className={classes.content}>
                    <Typography align={isMobile() ? "center" : "left"} variant="h2">
                        {props.barber.barber_name}
                    </Typography>
                    <div>
                        {props.barber.available_time.map((time, index) => {
                            return (
                                <Chip
                                    className={classes.chip}
                                    label={dateToTime(time.from)}
                                    color="secondary"
                                    key={index}
                                    onClick={() => {
                                        setFrom(time.from);
                                        setSelect(true);
                                    }}
                                />
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
            {select && (
                <ReservationFocused
                    from={from}
                    duration={props.barber.duration}
                    barberName={props.barber.barber_name}
                    service={props.service}
                    handleClose={() => {
                        setSelect(false);
                        bookReservation();
                    }}
                />
            )}
            {error && (
                <DialogMessage
                    title={"Error!"}
                    text={"The reservation was unsuccessful. Please try again."}
                    link={`/reserve/${props.storeID}`}
                />
            )}
            {success && (
                <DialogMessage
                    title={"Success!"}
                    text={"Your reservation was successful! See you soon!"}
                    link={`/reservations`}
                />
            )}
        </>
    );
}
