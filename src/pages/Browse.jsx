import React, { useEffect } from "react";
import BrowseCards from "../components/Browse/BrowseCards";
import Filters from "../components/Browse/Filter";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../actions/searchActions";
import Skeleton from "@material-ui/lab/Skeleton";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";

const searchCount = 20;

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
        width: "100%",
        [theme.breakpoints.up("md")]: {
            position: "sticky",
            alignSelf: "flex-start",
            top: 0,
            width: "17rem",
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
    const searchState = useSelector((state) => state.searchState);
    const dispatch = useDispatch();

    useEffect(() => {
        const queryObj = {};

        if (filterState.price) {
            queryObj.price = filterState.price;
        }
        if (filterState.rating) {
            queryObj.rating = filterState.rating;
        }
        if (filterState.rating) {
            queryObj.city = filterState.city;
        }

        dispatch(search(searchCount, queryObj));
    }, [filterState, dispatch]);

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
                {searchState.status !== "success" &&
                    skeletons.map((skeleton) => skeleton)}
                {searchState.status === "success" &&
                    searchState.data.map(
                        ({ id, name, services, cost, rating, address }) => {
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
                        }
                    )}
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
