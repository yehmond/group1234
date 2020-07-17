import {
    SIGN_OUT_SUCCESS,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_IN_LOADING,
    SIGN_OUT_LOADING,
    SIGN_OUT_ERROR,
    SET_SIGN_IN,
} from "../actions/authActions";

export default function authReducer(
    initialState = { isLoggedIn: true, role: "OWNER", userId: "11" },
    action
) {
    switch (action.type) {
        case SET_SIGN_IN:
            return {
                isLoggedIn: true,
                role: action.role.toUpperCase(),
                username: action.username,
            };
        case SIGN_IN_LOADING:
            return {
                isLoggedIn: false,
                status: "loading",
            };
        case SIGN_IN_SUCCESS:
            window.location = "/";
            window.localStorage.setItem("role", action.role);
            window.localStorage.setItem("username", action.username);
            return {
                isLoggedIn: true,
                role: action.role,
                username: action.username,
                status: "success",
            };
        case SIGN_IN_ERROR:
            return {
                isLoggedIn: false,
                status: "error",
            };
        case SIGN_OUT_LOADING:
            return {
                isLoggedIn: false,
                status: "loading",
            };
        case SIGN_OUT_SUCCESS:
            window.location = "/";
            window.localStorage.removeItem("role");
            window.localStorage.removeItem("username");
            return {
                isLoggedIn: false,
                status: "success",
            };
        case SIGN_OUT_ERROR:
            return {
                isLoggedIn: true,
                status: "error",
            };
        default:
            return initialState;
    }
}
