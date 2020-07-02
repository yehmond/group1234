import React, { useEffect, useState } from "react";
import BrowseCards from "../components/Browse/BrowseCards";
import Filters from "../components/Browse/Filter";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
// import { searchStore } from "../api/customer";
import { SERVICES_OFFERED } from "../utils/constants";
import Skeleton from "@material-ui/lab/Skeleton";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";

const searchCount = 20;
const mockShops = [];
for (let i = 0; i < searchCount; i++) {
    mockShops.push({
        id: i,
        name: "Citrus Hair Salon",
        services: SERVICES_OFFERED,
        cost: 3,
        rating: 5,
        address: "123 Main St.",
    });
}
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
        minWidth: "20rem",
        [theme.breakpoints.up("md")]: {
            position: "sticky",
            alignSelf: "flex-start",
            top: 0,
        },
    },
    cards: {
        flexGrow: 1,
    },
    paginationContainer: {
        display: "flex",
        margin: "3rem auto",
        justifyContent: "center",
    },
}));

export default function Browse() {
    const classes = useStyles();
    const filterState = useSelector((state) => state.filterState);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        setShops([]); // Loads placeholder rectangles
        async function loadStores() {
            // setShops(await searchStore(searchCount, filterState));
            setTimeout(() => {
                setShops(mockShops);
            }, 500);
        }
        loadStores();
    }, [filterState]);

    const skeletons = [];
    for (let i = 0; i < 12; i++) {
        skeletons.push(
            <Skeleton
                key={i}
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
                    shops.map(({ id, name, services, cost, rating, address }) => {
                        return (
                            <BrowseCards
                                key={id}
                                id={id}
                                name={name}
                                services={services}
                                cost={cost}
                                rating={rating}
                                address={address}
                            />
                        );
                    })}
                <div className={classes.paginationContainer}>
                    <Pagination
                        count={10}
                        size="large"
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/browse${
                                    item.page === 1 ? "" : `?page=${item.page}`
                                }`}
                                {...item}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
