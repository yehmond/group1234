import React, { useEffect, useState } from "react";
import BrowseCards from "../components/Browse/BrowseCards";
import Filters from "../components/Browse/Filter";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
// import { searchStore } from "../api/customer";
import { SERVICES_OFFERED } from "../utils/constants";
import Skeleton from "@material-ui/lab/Skeleton";

// const searchCount = 20;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    skeleton: {
        margin: "1rem",
        height: "12rem",
        borderRadius: "5px",
    },
    filter: {
        padding: "2rem 1rem",
        minWidth: "15rem",
        [theme.breakpoints.up("md")]: {
            position: "sticky",
            alignSelf: "flex-start",
            top: 0,
        },
    },
    cards: {
        flexGrow: 1,
    },
}));

export default function Browse() {
    let mockShops = [];
    for (let i = 0; i < 12; i++) {
        mockShops.push({
            id: "1",
            name: "Citrus Hair Salon",
            services: SERVICES_OFFERED,
            cost: 3,
            rating: 5,
            address: "123 Main St.",
        });
    }
    const classes = useStyles();
    const filterState = useSelector((state) => state.filterState);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        setShops([]);
        async function loadStores() {
            setTimeout(() => {
                // setShops(await searchStore(searchCount, filterState));
                setShops(mockShops);
            }, 1000);
        }
        loadStores();
    }, [filterState]);

    const skeletons = [];
    for (let i = 0; i < 12; i++) {
        skeletons.push(
            <Skeleton
                variant="rect"
                animation="wave"
                className={classes.skeleton}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.filter}>
                <Filters />
            </div>
            <div className={classes.cards}>
                {shops.length === 0 && skeletons.map((skeleton) => skeleton)}
                {shops.length > 0 &&
                    shops.map(
                        ({ id, name, services, cost, rating, address }, idx) => {
                            return (
                                <BrowseCards
                                    key={idx}
                                    id={id}
                                    name={name}
                                    services={services}
                                    cost={cost}
                                    rating={rating}
                                    address={address}
                                />
                            );
                        }
                    )}
            </div>
        </div>
    );
}
