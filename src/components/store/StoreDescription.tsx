import React from "react";

type StoreDescription = {
    description: string;
};

export default function StoreDescription({ description }: StoreDescription): JSX.Element {
    return (
        <>
            <div>
                <h3>{description}</h3>
            </div>
        </>
    );
}
