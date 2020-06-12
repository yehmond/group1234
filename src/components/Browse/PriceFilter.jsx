import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function PriceFilter() {
    return (
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button>$</Button>
            <Button>$$</Button>
            <Button>$$$</Button>
            <Button>$$$$</Button>
            <Button>$$$$$</Button>
        </ButtonGroup>
    );
}
