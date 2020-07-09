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
}) {
    const size = useWindowSize();

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
            />
        );
    } else {
        return (
            <div style={{ margin: "1rem" }}>
                <SmallCard
                    key={id}
                    id={id}
                    name={name}
                    services={services}
                    price={price}
                    rating={rating}
                    address={address}
                />
            </div>
        );
    }
}
