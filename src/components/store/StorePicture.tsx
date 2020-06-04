import React from "react";

type StoreId = {
    id: string;
};

export default function StorePicture({ id }: StoreId): JSX.Element {
    return (
        <>
            <div>
                <h3>StorePicture</h3>
            </div>
        </>
    );
}
