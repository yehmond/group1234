import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import { makeStyles, Theme } from "@material-ui/core";

type StoreMap = {
    address: string;
    city: string;
    province: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    outline: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.4rem",
        padding: "1.5rem",
        margin: "2%",
        height: "20rem",
    },
    container: {
        backgroundColor: "rgba(255,255,255,0.8)",
        width: "100%",
        height: "100%",
    },
    mapContainer: {
        padding: "0.1rem",
    },
}));

function StoreMap({
    address,
    city,
    province,
}: StoreMap): JSX.Element {
    const classes = useStyles();
    return (
        <>
            <div className={classes.outline}>
                <div className={classes.container}>
                    <div className={classes.mapContainer}>
                        <GoogleMap defaultZoom={8} defaultCenter={{ lat: 49.2606, lon: 123.2460 }}>
                        </GoogleMap>
                    </div>
                </div>
            </div>>
        </>
    );
}

export default  withScriptjs(withGoogleMap(StoreMap));
