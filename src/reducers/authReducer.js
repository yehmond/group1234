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
    initialState = { isLoggedIn: false, role: "", email: "" },
    action
) {
    switch (action.type) {
        case SET_SIGN_IN:
            return {
                isLoggedIn: true,
                role: action.role.toUpperCase(),
                email: action.email,
            };
        case SIGN_IN_LOADING:
            return {
                isLoggedIn: false,
                status: "loading",
            };
        case SIGN_IN_SUCCESS:
            window.location = "/";
            window.localStorage.setItem("role", action.role);
            window.localStorage.setItem("email", action.email);
            return {
                isLoggedIn: true,
                role: action.role,
                email: action.email,
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
            window.localStorage.removeItem("email");
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
