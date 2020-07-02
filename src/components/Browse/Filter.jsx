import React from "react";
import PriceFilter from "./PriceFilter";
import ServiceFilter from "./ServiceFilter";
import RatingFilter from "./RatingSlider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container: {
        "& > *": {
            marginBottom: "3rem",
        },
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
