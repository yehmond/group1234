import { searchStore } from "../api/customer";

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

export function searchError(msg) {
    return {
        type: SEARCH_ERROR,
        msg,
    };
}

export function search(count, queryObj) {
    return (dispatch) => {
        dispatch(searchLoading());
        searchStore(count, queryObj)
            .then((response) => {
                dispatch(searchSuccess(response.data));
            })
            .catch((err) => {
                dispatch(searchError(err));
            });
    };
}
