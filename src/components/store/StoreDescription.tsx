import React from "react";

type StoreId = {
    id: string;
};

export default function StoreDescription({ id }: StoreId): JSX.Element {
    return (
        <>
            <div>
                <h3>StoreDescription</h3>
            </div>
        </>
    );
}
