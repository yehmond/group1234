import React from "react";

type StoreMap = {
    address: string;
    city: string;
    province: string;
};

export default function StoreMap({ address, city, province }: StoreMap): JSX.Element {
    return (
        <>
            <div>
                <h3>{ address }, { city }, { province }</h3>
            </div>
        </>
    );
}
