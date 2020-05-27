import React from "react";
import SearchBar from "../component/SearchBar";
import { Theme, makeStyles } from "@material-ui/core";
import FlippingText from "../component/FlippingText";
import Recommendations from "../component/Recommendations";
import cover from "../images/home-cover.jpg";

const useStyles = makeStyles((theme: Theme) => ({
    background: {
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    filter: {
        backgroundColor: "rgba(255,255,255,.5)",
    },
    container: {
        padding: "1rem",
        minHeight: "25rem",
        position: "relative",
        display: "block",
    },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem",
    },
    discover: {
        width: "50%",
        textAlign: "right",
    },
    flippingText: {
        width: "50%",
        textAlign: "left",
        marginLeft: "1rem",
    },
}));

export default function Home(): JSX.Element {
    const classes = useStyles();
    const storesOptions = [
        "Hair Salons",
        "Day Spas",
        "Nail Salons",
        "Barber Shops",
        "Boutiques",
    ];
    return (
        <>
            <div className={classes.background}>
                <div className={classes.filter}>
                    <div className={classes.container}>
                        <div className={classes.titleContainer}>
                            <h1 className={classes.discover}>Discover</h1>
                            <h1 className={classes.flippingText}>
                                <FlippingText
                                    texts={storesOptions}
                                    color={"#303f9f"}
                                />
                            </h1>
                        </div>
                        <SearchBar />
                    </div>
                </div>
            </div>
            <Recommendations />
        </>
    );
}
