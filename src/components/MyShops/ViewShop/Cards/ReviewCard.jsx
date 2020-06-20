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
        gridTemplateColumns: "0.25fr 0.75fr",
    },
    leftPanel: {
        display: "grid",
        alignSelf: "center",
        justifySelf: "center",
    },
});

export default function ReviewCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant={"outlined"}>
            <CardContent className={classes.leftPanel}>
                <div className={"left-panel"}>
                    <Typography align={"center"} variant="h6">
                        {props.review.name}
                    </Typography>
                    <Rating name="rating" value={props.review.rating} disabled />
                </div>
            </CardContent>
            <CardContent>
                <p>{props.review.text}</p>
            </CardContent>
        </Card>
    );
}
