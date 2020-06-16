import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useDispatch } from "react-redux";
import { setRating } from "../../actions/filterActions";

const marks = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
];
export default function RatingSlider() {
    const dispatch = useDispatch();
    function handleChange(_, value) {
        dispatch(setRating(value));
    }
    return (
        <div>
            <Typography id="rating-slider" gutterBottom>
                Rating
            </Typography>
            <Slider
                defaultValue={1}
                aria-labelledby="rating-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `≥ ${value}`}
                step={1}
                marks={marks}
                min={1}
                max={5}
                onChangeCommitted={handleChange}
            />
        </div>
    );
}
