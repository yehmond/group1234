import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { useHistory } from "react-router-dom";
import salonPic from "../../images/salon.png";
import Chip from "@material-ui/core/Chip";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import TimeSlotCard from "../Browse/TimeSlotCard";

const useStyles = makeStyles({
    root: {
        margin: "1rem 0",
        width: "100%",
    },
    content: {
        height: "11rem",
    },
    name: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    media: {
        height: 200,
    },
    cardAction: {
        display: "flex",
        justifyContent: "center",
        padding: 0,
    },
    chips: {
        height: "3.5rem",
        margin: "0.25rem 0",
    },
    chip: {
        margin: 2,
    },
    button: {
        width: "100%",
        height: "3rem",
        borderRadius: "0",
    },
    timeSlots: {
        display: "flex",
        marginTop: "1rem",
    },
});

export default function SmallCard({
    shopId,
    name,
    services,
    price,
    rating,
    address,
    neighbourhood,
    picture,
    available_time,
}) {
    const classes = useStyles();
    const history = useHistory();

    function handleClickArea() {
        history.push(`/view/stores/${shopId}`);
    }

    function handleClickRequest() {
        history.push(`/reserve/${shopId}`);
    }

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

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClickArea}>
                <CardMedia
                    className={classes.media}
                    image={picture || salonPic}
                    title={name}
                />
                <CardContent className={classes.content}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.name}
                    >
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
                    <div className={classes.chips}>
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
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <LocationOnRoundedIcon /> {address}
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
                    &nbsp; Request Appointment
                </Button>
            </CardActions>
        </Card>
    );
}
