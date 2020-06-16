import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../../actions/filterActions";

export default function PriceFilter() {
    const filterState = useSelector((state) => state.filterState);
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
        const noPricesSelected =
            priceState[1] === "outlined" &&
            priceState[2] === "outlined" &&
            priceState[3] === "outlined";

        let newPriceObj;
        if (noPricesSelected) {
            newPriceObj = {
                1: false,
                2: false,
                3: false,
                [num]: true,
            };
        } else {
            newPriceObj = {
                ...filterState.price,
                [num]: !filterState.price[num],
            };
        }
        dispatch(setPrice(newPriceObj));
    }

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
