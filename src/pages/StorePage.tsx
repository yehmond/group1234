import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreName from "../components/Store/StoreName";
import StoreDescription from "../components/Store/StoreDescription";
import StoreSchedule from "../components/Store/StoreSchedule";
import StoreMap from "../components/Store/StoreMap";
import StoreReviews from "../components/Store/StoreReviews";
import { getStore } from "../api/store";
import { initializeBarbershop } from "../types/barbershop";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "0.5fr 1.5fr",
        margin: "2%",
    },
}));

export default function StorePage(): JSX.Element {
    const id: string = useParams();
    const classes = useStyles();
    const [store] = useState(initializeBarbershop());

    useEffect(() => {
        getStore(id);
    }, [id]);

    return (
        <>
            <StoreName name={store.name} photos={store.photos} />
            <div className={classes.container}>
                <div>
                    <StoreMap
                        address={store.address}
                        city={store.city}
                        province={store.province}
                    />
                    <StoreSchedule id={id} />
                </div>
                <StoreDescription description={store.description} />
            </div>
            <StoreReviews id={id} />
        </>
    );
}
