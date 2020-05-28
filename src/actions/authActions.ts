import {
    LOGIN_CUSTOMER,
    AuthTypes,
    LOGIN_OWNER,
    LOGOUT,
} from "../types/authActionTypes";

export function loginOwner(): AuthTypes {
    return {
        type: LOGIN_OWNER,
        payload: {
            isLoggedIn: true,
            role: "OWNER",
        },
    };
}

export function loginCustomer(): AuthTypes {
    return {
        type: LOGIN_CUSTOMER,
        payload: {
            isLoggedIn: true,
            role: "CUSTOMER",
        },
    };
}

export function logout(): AuthTypes {
    return {
        type: LOGOUT,
        payload: {
            isLoggedIn: false,
            role: "",
        },
    };
}
