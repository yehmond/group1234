import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import { parseSearchURL, setQueryString } from "../../utils/utils";
import { useSelector } from "react-redux";
import { RESULTS_PER_PAGE } from "../../pages/Browse";

const useStyles = makeStyles(() => ({
    paginationContainer: {
        display: "flex",
        margin: "3rem auto",
        justifyContent: "center",
    },
}));

export default function Pages() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [page, setPage] = useState(1);
    const count = useSelector((state) => state.searchState.data?.count);

    const handleChange = (_, newPage) => {
        setPage(newPage);
        setQueryString({ page: newPage }, history, false);
    };

    useEffect(() => {
        const { page } = parseSearchURL();
        if (page) {
            setPage(page);
        }
    }, [location]);

    return (
        <div className={classes.paginationContainer}>
            <Pagination
                page={page}
                count={Math.ceil(count / RESULTS_PER_PAGE)}
                size="large"
                onChange={handleChange}
            />
        </div>
    );
}
