import React from "react";
import { Theme, makeStyles } from "@material-ui/core";

type StoreName = {
    name: string;
    photos: File[];
};

export default function StoreName({ name, photos }: StoreName): JSX.Element {
    return (
        <>
            <div>
                <h3>{ name }</h3>
            </div>
        </>
    );
}
