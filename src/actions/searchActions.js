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

export function search(body) {
    return (dispatch) => {
        dispatch(searchLoading());
        searchStore(12, body)
            .then((data) => {
                dispatch(searchSuccess(data));
            })
            .catch((err) => {
                dispatch(searchError(err));
            });
    };
}
