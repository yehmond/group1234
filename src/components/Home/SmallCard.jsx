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
});

export default function SmallCard({
    id,
    name,
    services,
    price,
    rating,
    address,
    neighbourhood,
    picture,
}) {
    const classes = useStyles();
    const history = useHistory();

    function handleClickArea() {
        history.push(`/view/stores/${id}`);
    }

    function handleClickRequest() {
        history.push(`/reserve/${id}`);
    }

    const dollarSigns = [];
    for (let i = 0; i < price; i++) {
        dollarSigns.push(
            <Typography variant="body2" color="textPrimary">
                $
            </Typography>
        );
    }
    for (let i = 0; i < 5 - price; i++) {
        dollarSigns.push(
            <Typography variant="body2" color="textSecondary">
                $
            </Typography>
        );
    }

    const ratingStars = [];
    for (let i = 0; i < rating; i++) {
        ratingStars.push(<StarRoundedIcon fontSize="small" color="secondary" />);
    }
    for (let i = 0; i < 5 - rating; i++) {
        ratingStars.push(
            <StarBorderRoundedIcon fontSize="small" color="disabled" />
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
                    <Typography variant="body2" color="textPrimary" component="p">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {dollarSigns}&nbsp;· {ratingStars} · {neighbourhood}
                        </div>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                        className={classes.chips}
                    >
                        {services.map((service, idx) => {
                            // if (idx === services.length - 1) {
                            //     return service;
                            // }
                            // return service + " | ";
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
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
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
                    </Typography>
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
