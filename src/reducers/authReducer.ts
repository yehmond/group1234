import {
    AuthState,
    LOGIN_OWNER,
    LOGIN_CUSTOMER,
    LOGOUT,
    AuthTypes,
} from "../types/authActionTypes";

export default function authReducer(
    initialState = { isLoggedIn: true, role: "CUSTOMER" },
    action: AuthTypes
): AuthState {
    switch (action.type) {
        case LOGIN_OWNER:
            return {
                isLoggedIn: true,
                role: "OWNER",
            };
        case LOGIN_CUSTOMER:
            return {
                isLoggedIn: true,
                role: "CUSTOMER",
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
                role: "",
            };
        default:
            return initialState;
    }
}
