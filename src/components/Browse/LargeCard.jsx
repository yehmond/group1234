import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import salonPic from "../../images/salon.png";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

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
    chip: {
        margin: theme.spacing(0.5),
    },
    button: {
        margin: "0 auto",
    },
}));

export default function LargeCard({ id, name, services, price, rating, address }) {
    const classes = useStyles();
    const history = useHistory();

    let dollarSigns = "";
    for (let i = 0; i < price; i++) {
        dollarSigns += "$";
    }

    let ratingStars = "";
    for (let i = 0; i < rating; i++) {
        ratingStars += "⭐️";
    }

    function handleClickArea() {
        history.push(`/stores/${id}`);
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
                    image={salonPic}
                    title="Salon"
                />
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {dollarSigns} · {ratingStars}
                    </Typography>
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
                    <Typography variant="body2" color="textSecondary" component="p">
                        {address}
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
                    &nbsp;Request&nbsp;Appointment
                </Button>
            </CardActions>
        </Card>
    );
}
