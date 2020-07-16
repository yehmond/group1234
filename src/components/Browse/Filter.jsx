import React from "react";
import PriceFilter from "./PriceFilter";
import ServiceFilter from "./ServiceFilter";
import RatingFilter from "./RatingSlider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        "& > *": {
            marginBottom: "3rem",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "2rem 1rem",
            width: "100%",
            position: "unset",
        },
        padding: "2rem 1rem",
        position: "sticky",
        alignSelf: "flex-start",
        top: 0,
        minWidth: "17rem",
    },
}));

export default function Filter() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <PriceFilter />
            <ServiceFilter />
            <RatingFilter />
        </div>
    );
}
