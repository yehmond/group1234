import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import { parseSearchURL, setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";

export default function PriceFilter() {
    const location = useLocation();
    const history = useHistory();
    const [priceState, setPriceState] = useState([]);

    useEffect(() => {
        const { price } = parseSearchURL();
        if (price?.length > 0) {
            setPriceState(price);
        }
    }, [location]);

    function handleClick(num) {
        let newPriceState = [];
        if (priceState.includes(num)) {
            newPriceState = priceState.filter((p) => p !== num);
        } else {
            newPriceState = [...priceState, num];
        }
        setPriceState(newPriceState);
        setQueryString({ price: newPriceState }, history, true);
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
                <Button
                    onClick={() => handleClick(1)}
                    variant={priceState.includes(1) ? "contained" : "outlined"}
                >
                    $
                </Button>
                <Button
                    onClick={() => handleClick(2)}
                    variant={priceState.includes(2) ? "contained" : "outlined"}
                >
                    $$
                </Button>
                <Button
                    onClick={() => handleClick(3)}
                    variant={priceState.includes(3) ? "contained" : "outlined"}
                >
                    $$$
                </Button>
            </ButtonGroup>
        </div>
    );
}
