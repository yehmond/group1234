/* eslint-disable no-console */
import { signIn, signOut } from "../api/auth";

export const SIGN_IN_LOADING = "SIGN_IN_LOADING";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_IN_OWNER = "SIGN_IN_OWNER";
export const SIGN_IN_CUSTOMER = "SIGN_IN_CUSTOMER";
export const SIGN_OUT_LOADING = "SIGN_OUT_LOADING";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_ERROR = "SIGN_OUT_ERROR";
export const SET_SIGN_IN = "SET_SIGN_IN";

export function setSignInStatus(username, role) {
    return {
        type: SET_SIGN_IN,
        username,
        role,
    };
}

export function signInLoading() {
    return {
        type: SIGN_IN_LOADING,
    };
}

export function signInSuccess(username, role) {
    return {
        type: SIGN_IN_SUCCESS,
        username,
        role,
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
            .then((res) => {
                dispatch(signInSuccess(res.username, res.role));
            })
            .catch((err) => {
                console.log(err);
                dispatch(signInError(err));
            });
    };
}

export function signOutSuccess() {
    return {
        type: SIGN_OUT_SUCCESS,
    };
}

export function signOutLoading() {
    return {
        type: SIGN_OUT_LOADING,
    };
}

export function signOutError() {
    return {
        type: SIGN_OUT_ERROR,
    };
}

export function signOutAsync() {
    return (dispatch) => {
        dispatch(signOutLoading());
        signOut()
            .then(() => {
                dispatch(signOutSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(signOutError(err));
            });
    };
}
