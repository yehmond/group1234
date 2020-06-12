import React from "react";
import PriceFilter from "./PriceFilter";
import ServiceFilter from "./ServiceFilter";

export default function Filter() {
    return (
        <div>
            <PriceFilter />
            <ServiceFilter />
        </div>
    );
}
