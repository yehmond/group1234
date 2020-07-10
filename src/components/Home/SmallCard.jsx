import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import salonPic from "../../images/salon.png";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        margin: "1rem 0",
        width: "100%",
    },
    media: {
        height: 150,
    },
    cardAction: {
        display: "flex",
        justifyContent: "center",
        padding: 0,
    },
    button: {
        width: "100%",
        height: "100%",
        minHeight: "3rem",
        borderRadius: "0",
    },
});

export default function SmallCard({ shopId, name, services, price, rating }) {
    const classes = useStyles();
    const history = useHistory();

    function handleClickArea() {
        history.push(`/stores/${shopId}`);
    }

    function handleClickRequest() {
        history.push(`/reserve/${shopId}`);
    }

    let dollarSigns = "";
    for (let i = 0; i < price; i++) {
        dollarSigns += "$";
    }

    let ratingStars = "";
    for (let i = 0; i < rating; i++) {
        ratingStars += "⭐️";
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClickArea}>
                <CardMedia
                    className={classes.media}
                    image={salonPic}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {services.map((service, idx) => {
                            if (idx === services.length - 1) {
                                return service;
                            }
                            return service + " | ";
                        })}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {dollarSigns} · {ratingStars}
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
