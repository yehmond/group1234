import React, { useEffect } from "react";
import BrowseCards from "../components/Browse/BrowseCards";
import Filters from "../components/Browse/Filter";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../actions/searchActions";
import Skeleton from "@material-ui/lab/Skeleton";
import { useLocation } from "react-router-dom";
import Pages from "../components/Browse/Pages";

export const RESULTS_PER_PAGE = 10;

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
    cards: {
        flexGrow: 1,
    },
    paginationContainer: {
        display: "flex",
        margin: "3rem auto",
        justifyContent: "center",
    },
    noResult: {
        display: "flex",
        margin: "3rem auto",
        justifyContent: "center",
    },
}));

export default function Browse() {
    const classes = useStyles();
    const searchState = useSelector((state) => state.searchState);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(search());
    }, [location, dispatch]);

    const skeletons = [];
    for (let i = 0; i < RESULTS_PER_PAGE; i++) {
        skeletons.push(i);
    }

    function hasNoResult() {
        return (
            (searchState.status === "success" &&
                searchState.data?.stores.length === 0) ||
            searchState.status === "error"
        );
    }

    return (
        <div className={classes.root}>
            <div>
                <Filters />
            </div>
            <div className={classes.cards}>
                {/* Loading */}
                {searchState.status === "loading" &&
                    skeletons.map((id, i) => (
                        <Skeleton
                            key={i}
                            variant="rect"
                            animation="wave"
                            className={classes.skeleton}
                        />
                    ))}

                {/* Have results */}
                {searchState.status === "success" &&
                    searchState.data?.stores.length > 0 &&
                    searchState.data?.stores.map(
                        ({
                            store_id,
                            name,
                            services,
                            price,
                            rating,
                            address,
                            city,
                            province,
                            picture,
                            neighbourhood,
                            available_time,
                        }) => {
                            return (
                                <BrowseCards
                                    key={store_id}
                                    id={store_id}
                                    name={name}
                                    services={services}
                                    price={price}
                                    rating={rating}
                                    address={address}
                                    city={city}
                                    province={province}
                                    picture={picture}
                                    neighbourhood={neighbourhood}
                                    available_time={available_time}
                                />
                            );
                        }
                    )}

                {/* No results */}
                {hasNoResult() && (
                    <div className={classes.noResult}>
                        <h2>
                            <span role="img" aria-label="sad-face">
                                😞
                            </span>{" "}
                            No results...Please try again with a different search
                            parameter
                        </h2>
                    </div>
                )}

                {/* Pages */}
                {searchState.data?.stores.length > 0 && <Pages />}
            </div>
        </div>
    );
}
