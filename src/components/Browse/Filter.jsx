import React from "react";
import PriceFilter from "./PriceFilter";
import ServiceFilter from "./ServiceFilter";
import RatingFilter from "./RatingSlider";
import style from "./Filter.module.css";

export default function Filters() {
    return (
        <div className={style.container}>
            <PriceFilter />
            <ServiceFilter />
            <RatingFilter />
        </div>
    );
}
