import { signIn } from "../api/auth";

export const SIGN_IN_LOADING = "SIGN_IN_LOADING";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_IN_OWNER = "SIGN_IN_OWNER";
export const SIGN_IN_CUSTOMER = "SIGN_IN_CUSTOMER";
export const SIGN_OUT = "SIGN_OUT";

export function signInOwner() {
    return {
        type: SIGN_IN_OWNER,
        payload: {
            isLoggedIn: true,
            role: "OWNER",
        },
    };
}

export function signInCustomer() {
    return {
        type: SIGN_IN_CUSTOMER,
        payload: {
            isLoggedIn: true,
            role: "CUSTOMER",
        },
    };
}

export function signOut() {
    return {
        type: SIGN_OUT,
        payload: {
            isLoggedIn: false,
            role: "",
        },
    };
}

export function signInLoading() {
    return {
        type: SIGN_IN_LOADING,
    };
}

export function signInSuccess(data) {
    return {
        type: SIGN_IN_SUCCESS,
        data,
    };
}

export function signInError(msg) {
    return {
        type: SIGN_IN_ERROR,
        msg,
    };
}

export function signInAsync(username, password) {
    return (dispatch) => {
        dispatch(signInLoading());
        signIn(username, password)
            .then(() => {
                dispatch(signInSuccess());
                window.location = "/";
            })
            .catch((err) => {
                dispatch(signInError(err));
            });
    };
}
