import React from "react";
import { useWindowSize } from "../../utils/utils";
import LargeCard from "./LargeCard";
import SmallCard from "../Home/SmallCard";

export default function BrowseCards({
    id,
    name,
    services,
    price,
    rating,
    address,
    city,
    province,
    picture,
    neighbourhood,
    available_time,
}) {
    const size = useWindowSize();
    const uniqueAvailableTime = Array.from(
        new Set(
            available_time
                .map((elem) => {
                    return elem.from;
                })
                .sort()
        )
    );

    if (size.width > 700) {
        return (
            <LargeCard
                key={id}
                id={id}
                name={name}
                services={services}
                price={price}
                rating={rating}
                address={address}
                city={city}
                province={province}
                neighbourhood={neighbourhood}
                picture={picture}
                available_time={uniqueAvailableTime}
            />
        );
    } else {
        return (
            <div style={{ margin: "1rem" }}>
                <SmallCard
                    key={id}
                    shopId={id}
                    name={name}
                    services={services}
                    price={price}
                    rating={rating}
                    address={address}
                    city={city}
                    province={province}
                    neighbourhood={neighbourhood}
                    picture={picture}
                    available_time={uniqueAvailableTime}
                />
            </div>
        );
    }
}
