/* eslint-disable no-console */
import { signIn, signOut } from "../api/auth";
export const SET_SIGN_IN = "SET_SIGN_IN";
export const SIGN_IN_LOADING = "SIGN_IN_LOADING";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGN_OUT_LOADING = "SIGN_OUT_LOADING";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_ERROR = "SIGN_OUT_ERROR";

export function setSignInStatus(email, role, id) {
    return {
        type: SET_SIGN_IN,
        email,
        role,
        id,
    };
}

export function signInLoading() {
    return {
        type: SIGN_IN_LOADING,
    };
}

export function signInSuccess(email, role, id) {
    return {
        type: SIGN_IN_SUCCESS,
        email,
        role,
        id,
    };
}

export function signInError(msg) {
    return {
        type: SIGN_IN_ERROR,
        msg,
    };
}

export function signInAsync(email, password) {
    return (dispatch) => {
        dispatch(signInLoading());
        signIn(email, password)
            .then((res) => {
                dispatch(signInSuccess(res.email, res.role, res.id));
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
