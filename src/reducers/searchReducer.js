import {
    SEARCH_LOADING,
    SEARCH_ERROR,
    SEARCH_SUCCESS,
} from "../actions/searchActions";

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case SEARCH_LOADING: {
            return {
                status: "loading",
            };
        }
        case SEARCH_ERROR:
            return {
                ...state,
                error: action.error,
                status: "error",
            };
        case SEARCH_SUCCESS:
            return {
                data: action.data,
                status: "success",
            };
        default:
            return state;
    }
}
