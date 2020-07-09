import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { parseSearchURL, setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";

const marks = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
];

export default function RatingSlider() {
    const location = useLocation();
    const history = useHistory();
    const [rating, setRating] = useState(1);

    useEffect(() => {
        const { rating } = parseSearchURL();
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
        <div>
            <Typography id="rating-slider" gutterBottom>
                Rating
            </Typography>
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
