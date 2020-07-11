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
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true,
});

export async function signIn(username, password) {
    const body = { id: username, password };
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
    username,
    password,
    role,
    firstName,
    lastName,
    email,
    phoneNumber
) {
    const body = {
        id: username,
        password,
        role,
        firstName,
        lastName,
        email,
        phoneNumber,
    };
    for (const key in body) {
        if (typeof body[key] === "undefined") {
            throw Error(`Missing ${key}`);
        }
    }

    try {
        const response = await instance.post("/signup/", body);
        return response.data;
    } catch (err) {
        console.error(err);
        throw Error(err);
    }
}
