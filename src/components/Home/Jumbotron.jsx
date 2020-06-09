import React from "react";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core";
import FlippingText from "./FlippingText";
import cover from "../../images/home-cover.jpg";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    filter: {
        backgroundColor: "rgba(255,255,255,.45)",
    },
    container: {
        padding: "1rem",
        minHeight: "25rem",
        display: "block",
    },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.80rem",
        },
    },
    discover: {
        width: "50%",
        textAlign: "right",
    },
    flippingText: {
        width: "50%",
        textAlign: "left",
        marginLeft: "0.75rem",
    },
}));

export default function JumboTron() {
    const classes = useStyles();
    const storesOptions = [
        "Hair Salons",
        "Day Spas",
        "Nail Salons",
        "Barber Shops",
        "Boutiques",
    ];
    return (
        <div className={classes.background}>
            <div className={classes.filter}>
                <div className={classes.container}>
                    <div className={classes.titleContainer}>
                        <h1 className={classes.discover}>Discover</h1>
                        <h1 className={classes.flippingText}>
                            <FlippingText texts={storesOptions} color={"rgba(0, 136, 122, 1)"} />
                        </h1>
                    </div>
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}
