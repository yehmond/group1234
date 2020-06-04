import React from "react";

type StoreId = {
    id: string;
};

export default function StoreName({id}: StoreId): JSX.Element {
    return (
        <>
            <div>
                <h3>
                    StoreName
                </h3>
            </div>
        </>
    );
}