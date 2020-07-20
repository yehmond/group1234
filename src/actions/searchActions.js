import { searchStores } from "../api/customer";
import { RESULTS_PER_PAGE } from "../pages/Browse";
import { parseSearchURL } from "../utils/utils";
import { SERVICES_OFFERED } from "../utils/constants";

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
    const queryObj = parseSearchURL();
    if (queryObj.price?.length === 0) {
        queryObj.price = [1, 2, 3];
    }

    if (queryObj.services?.length === 0) {
        queryObj.services = SERVICES_OFFERED;
    }

    if ("page" in queryObj) {
        queryObj.startIndex = (queryObj.page - 1) * RESULTS_PER_PAGE;
    }

    return (dispatch) => {
        dispatch(searchLoading());
        searchStores(RESULTS_PER_PAGE, queryObj).then((response) => {
            if (response.status === 200) {
                dispatch(searchSuccess(response));
            } else {
                dispatch(searchError(response));
            }
        });
    };
}
