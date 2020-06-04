import React from "react";
import { useParams } from "react-router-dom";
import StoreName from "../components/store/StoreName"
import StorePicture from "../components/store/StorePicture"
import StoreDescription from "../components/store/StoreDescription"
import StoreSchedule from "../components/store/StoreSchedule"
import StoreMap from "../components/store/StoreMap"
import StoreReviews from "../components/store/StoreReviews"

export default function StorePage(): JSX.Element {
    let id: string = useParams();

    return (
        <>
            <StoreName id={id} />
            <StorePicture id={id} />
            <StoreDescription id={id} />
            <StoreSchedule id={id} />
            <StoreMap id={id} />
            <StoreReviews id={id} />
        </>
    );
}