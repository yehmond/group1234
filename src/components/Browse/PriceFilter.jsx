import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
    },
}));

function getPriceFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const price = params.get("price");
    if (price) {
        return price
            .split(",")
            .map((str) => Number(str))
            .filter((num) => [1, 2, 3].includes(num))
            .sort();
    }
    return null;
}

export default function PriceFilter() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [priceState, setPriceState] = useState([]);

    useEffect(() => {
        const price = getPriceFromUrl();
        if (price && price.length > 0) {
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
        <div className={classes.container}>
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
