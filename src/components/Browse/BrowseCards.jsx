import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import salonPic from "../../images/salon.png";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "../../utils/utils";

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
    },
    cover: {
        width: "12rem",
        height: "12rem",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            height: "7rem",
        },
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function BrowseCards({ id, name, services, cost, rating, address }) {
    const classes = useStyles();
    const history = useHistory();
    const size = useWindowSize();

    let dollarSigns = "";
    for (let i = 0; i < cost; i++) {
        dollarSigns += "$";
    }

    let ratingStars = "";
    for (let i = 0; i < rating; i++) {
        ratingStars += "⭐️";
    }

    function handleClickArea() {
        history.push(`/store/${id}`);
    }

    if (size.width > 600) {
        return (
            <Card className={classes.root}>
                <CardActionArea
                    onClick={handleClickArea}
                    className={classes.action}
                >
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
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {dollarSigns} · {ratingStars}
                        </Typography>
                        <br />
                        {services.map((service, idx) => {
                            return (
                                <Chip
                                    size="small"
                                    key={idx}
                                    className={classes.chip}
                                    label={service}
                                />
                            );
                        })}
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {address}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClickArea}>
                <CardMedia
                    component="img"
                    className={classes.cover}
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
        </Card>
    );
}
