import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";

const marks = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
];

const useStyles = makeStyles(() => ({
    container: {
        width: "90%",
        margin: "0 auto",
    },
}));

function getRatingFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const rating = Number(params.get("rating"));
    if (rating >= 1 && rating <= 5) {
        return rating;
    }
    return null;
}

export default function RatingSlider() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [rating, setRating] = useState(1);

    useEffect(() => {
        const rating = getRatingFromUrl();
        if (rating) {
            setRating(rating);
        }
    }, [location]);

    function handleChange(_, newRating) {
        setRating(newRating);
    }

    function handleCommitted(_, newRating) {
        setQueryString({ rating: newRating }, history, true);
    }

    return (
        <div className={classes.container}>
            <Slider
                value={rating}
                aria-labelledby="rating-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `≥ ${value}`}
                step={1}
                marks={marks}
                min={1}
                max={5}
                onChange={handleChange}
                onChangeCommitted={handleCommitted}
            />
        </div>
    );
}
