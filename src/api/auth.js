/* eslint-disable no-console */
/*************
 *
 * Filename:  auth.js
 *
 * Purpose:   API functions for backend interactions related to authentication
 *
 **************/

/* Include files */
import axios from "axios";

/* Local constants */
const instance = axios.create({
    // TODO abstract baseURL
    baseURL:
        (process.env.REACT_APP_BASE_URL || "http://localhost:5000") + "/api/auth",
    withCredentials: true,
});

export async function signIn(email, password) {
    const body = { email, password };
    try {
        const response = await instance.post("/signin/", body);
        console.log(response);
        return response.data;
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
}

export async function signOut() {
    try {
        const response = await instance.get("/signout/");
        console.log(response);
        return response.data;
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
}

export async function signUp(
    password,
    role,
    first_name,
    last_name,
    email,
    phone_number
) {
    const body = {
        password,
        role,
        first_name,
        last_name,
        email,
        phone_number,
    };

    try {
        const response = await instance.post("/signup/", body);
        return response.data;
    } catch (err) {
        console.error(err?.response);
        throw Error(err);
    }
}
