import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import salonPic from "../../images/salon.png";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import TimeSlotCard from "./TimeSlotCard";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "9rem",
        margin: "1rem",
    },
    action: {
        display: "flex",
    },
    content: {
        flex: "1 1 auto",
        flexWrap: "wrap",
        "& > p": {
            padding: "0.25rem",
        },
    },
    cover: {
        width: "12rem",
        height: "12rem",
        objectFit: "cover",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            height: "7rem",
        },
    },
    dollar: { display: "flex" },
    chip: {
        margin: theme.spacing(0.5),
    },
    timeSlots: {
        display: "flex",
        marginTop: "1rem",
    },
    button: {
        margin: "0 auto",
    },
}));

export default function LargeCard({
    id,
    name,
    services,
    price,
    rating,
    address,
    city,
    province,
    picture,
    neighbourhood,
    available_time,
}) {
    const classes = useStyles();
    const history = useHistory();

    const dollarSigns = [];
    for (let i = 0; i < price; i++) {
        dollarSigns.push(
            <Typography variant="body2" color="textPrimary" key={i}>
                $
            </Typography>
        );
    }
    for (let i = 0; i < 3 - price; i++) {
        dollarSigns.push(
            <Typography variant="body2" color="textSecondary" key={3 - i}>
                $
            </Typography>
        );
    }

    const ratingStars = [];
    for (let i = 0; i < rating; i++) {
        ratingStars.push(
            <StarRoundedIcon fontSize="small" color="secondary" key={i} />
        );
    }
    for (let i = 0; i < 5 - rating; i++) {
        ratingStars.push(
            <StarBorderRoundedIcon fontSize="small" color="disabled" key={5 - i} />
        );
    }

    function handleClickArea() {
        history.push(`/view/stores/${id}`);
    }

    function handleClickRequest(event) {
        event.stopPropagation();
        history.push(`/reserve/${id}`);
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClickArea} className={classes.action}>
                <CardMedia
                    component="img"
                    className={classes.cover}
                    image={picture || salonPic}
                    title="Salon"
                />
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {dollarSigns}&nbsp;· {ratingStars} · {neighbourhood}
                    </div>
                    {services.map((service, idx) => {
                        return (
                            <Chip
                                size="small"
                                color="default"
                                key={idx}
                                className={classes.chip}
                                label={service}
                            />
                        );
                    })}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <LocationOnRoundedIcon />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {address}, {city} {province}
                        </Typography>
                    </div>
                    <div className={classes.timeSlots}>
                        {available_time &&
                            available_time.map((time, idx) => {
                                if (idx < 5) {
                                    return <TimeSlotCard key={idx} time={time} />;
                                } else {
                                    return null;
                                }
                            })}
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardAction} disableSpacing>
                <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    onClick={handleClickRequest}
                >
                    <EventAvailableIcon />
                    &nbsp;Request&nbsp;Appointment
                </Button>
            </CardActions>
        </Card>
    );
}
