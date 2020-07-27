import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: "grid",
        gridTemplateColumns: "0.4fr 0.6fr",
    },
    leftPanel: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
    },
    iconContent: {
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        alignItems: "center",
        justifyItems: "center",
    },
});

export default function ReviewCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant={"outlined"}>
            <CardContent className={classes.leftPanel}>
                <div className={classes.iconContent}>
                    <Typography align={"center"} variant="h6">
                        {props.review.user_name}
                    </Typography>
                    <Rating name="rating" value={props.review.rating} disabled />
                </div>
                <div className={classes.iconContent}>
                    <i className="material-icons">content_cut</i>
                    <Typography align={"center"} variant="h6">
                        {props.review.barber_name}
                    </Typography>
                </div>
            </CardContent>
            <CardContent>
                <p>{props.review.review}</p>
            </CardContent>
        </Card>
    );
}
