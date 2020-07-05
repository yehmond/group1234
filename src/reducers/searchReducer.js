import {
    SEARCH_LOADING,
    SEARCH_ERROR,
    SEARCH_SUCCESS,
} from "../actions/searchActions";

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case SEARCH_LOADING: {
            return {
                ...state,
                status: "loading",
            };
        }
        case SEARCH_ERROR:
            return {
                ...state,
                msg: action.msg,
                status: "error",
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                msg: "",
                data: action.data,
                status: "success",
            };
        default:
            return state;
    }
}
