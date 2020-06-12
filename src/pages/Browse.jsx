import React from "react";
import BrowseCards from "../components/Browse/BrowseCards";
import Filter from "../components/Browse/Filter";

const mockShops = [];
for (let i = 0; i < 12; i++) {
    mockShops.push({
        id: "1",
        name: "Citrus Hair Salon",
        services: ["Hair Salon", "Day Spa", "Waxing", "Nail", "Hair dye"],
        cost: 4,
        rating: 5,
    });
}

export default function Browse() {
    return (
        <>
            <Filter />
            {mockShops.map(({ id, name, services, cost, rating }) => {
                return (
                    <BrowseCards
                        key={id}
                        id={id}
                        name={name}
                        services={services}
                        cost={cost}
                        rating={rating}
                    />
                );
            })}
        </>
    );
}
