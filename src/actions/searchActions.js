import { searchStores } from "../api/customer";
import { RESULTS_PER_PAGE } from "../pages/Browse";
import { parseSearchURL } from "../utils/utils";
import { SERVICES_OFFERED } from "../utils/constants";
import moment from "moment";

export const SEARCH_LOADING = "SEARCH_LOADING";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_ERROR = "SEARCH_ERROR";

export function searchLoading() {
    return {
        type: SEARCH_LOADING,
    };
}

export function searchSuccess(data) {
    return {
        type: SEARCH_SUCCESS,
        data,
    };
}

export function searchError(error) {
    return {
        type: SEARCH_ERROR,
        error,
    };
}

export function search() {
    const queryParams = getQueryParams();
    return (dispatch) => {
        dispatch(searchLoading());
        searchStores(RESULTS_PER_PAGE, queryParams).then((response) => {
            if (response) {
                dispatch(searchSuccess(response));
            } else {
                dispatch(searchError(response));
            }
        });
    };
}

function getQueryParams() {
    const queryObj = parseSearchURL();

    if (queryObj.date && moment(queryObj.date).isValid()) {
        queryObj.date = moment(queryObj.date, "YYYY-MM-DD").toDate();
    }

    if (queryObj.time && moment(queryObj.time, "HH:mm").isValid()) {
        queryObj.time = moment(queryObj.time, "HH:mm").toDate();
    }

    if (queryObj.price?.length === 0) {
        queryObj.price = String([1, 2, 3]);
    }
    if (queryObj.price) {
        queryObj.price = String(queryObj.price);
    }

    if (queryObj.services) {
        queryObj.services = String(queryObj.services);
    }
    if (queryObj.services?.length === 0) {
        queryObj.services = String(SERVICES_OFFERED);
    }

    if (queryObj.neighbourhoods) {
        queryObj.neighbourhoods = String(queryObj.neighbourhoods);
    }

    if ("page" in queryObj) {
        queryObj.startIndex = (queryObj.page - 1) * RESULTS_PER_PAGE;
    }

    queryObj.time_frame = 30;
    return removeEmptyParams(queryObj);
}

function removeEmptyParams(queryObj) {
    Object.keys(queryObj).forEach((key) =>
        queryObj[key] === undefined || queryObj[key].length === 0
            ? delete queryObj[key]
            : null
    );

    return queryObj;
}
