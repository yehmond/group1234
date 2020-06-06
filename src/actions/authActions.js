export function loginOwner() {
    return {
        type: "LOGIN_OWNER",
        payload: {
            isLoggedIn: true,
            role: "OWNER",
        },
    };
}

export function loginCustomer() {
    return {
        type: "LOGIN_CUSTOMER",
        payload: {
            isLoggedIn: true,
            role: "CUSTOMER",
        },
    };
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: {
            isLoggedIn: false,
            role: "",
        },
    };
}
