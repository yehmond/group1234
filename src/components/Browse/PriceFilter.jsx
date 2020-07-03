import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { setPrice } from "../../actions/filterActions";

export default function PriceFilter() {
    const dispatch = useDispatch();
    const [priceState, setPriceState] = useState({
        1: "outlined",
        2: "outlined",
        3: "outlined",
    });

    function handleClick(num) {
        setPriceState({
            ...priceState,
            [num]: priceState[num] === "outlined" ? "contained" : "outlined",
        });
    }

    useEffect(() => {
        const newPrice = Object.keys(priceState).reduce((acc, key) => {
            if (priceState[key] === "contained") {
                acc.push(Number(key));
            }
            return acc;
        }, []);

        dispatch(setPrice(newPrice));
    }, [priceState, dispatch]);

    return (
        <div>
            <Typography id="rating-slider" gutterBottom>
                Price Range
            </Typography>
            <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                fullWidth
                disableElevation
            >
                <Button onClick={() => handleClick(1)} variant={priceState["1"]}>
                    $
                </Button>
                <Button onClick={() => handleClick(2)} variant={priceState["2"]}>
                    $$
                </Button>
                <Button onClick={() => handleClick(3)} variant={priceState["3"]}>
                    $$$
                </Button>
            </ButtonGroup>
        </div>
    );
}
