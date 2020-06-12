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

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        display: "flex",
        minHeight: "9rem",
        margin: "1rem",
    },
    action: {
        display: "flex",
    },
    content: {
        flex: "1 0 auto",
    },
    cover: {
        minWidth: "9rem",
        minHeight: "9rem",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function BrowseCards({ id, name, services, cost, rating }) {
    const classes = useStyles();
    const history = useHistory();

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

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClickArea} className={classes.action}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {dollarSigns} · {ratingStars}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="textPrimary" component="p">
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
                    </Typography>
                </CardContent>
                <div className={classes.controls}></div>
                <CardMedia
                    className={classes.cover}
                    image={salonPic}
                    title="Salon"
                />
            </CardActionArea>
        </Card>
    );
}
