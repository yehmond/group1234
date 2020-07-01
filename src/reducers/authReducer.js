export default function authReducer(
    initialState = { isLoggedIn: true, role: "OWNER" },
    action
) {
    switch (action.type) {
        case "LOGIN_OWNER":
            return {
                isLoggedIn: true,
                role: "OWNER",
            };
        case "LOGIN_CUSTOMER":
            return {
                isLoggedIn: true,
                role: "CUSTOMER",
            };
        case "LOGOUT":
            return {
                isLoggedIn: false,
                role: "",
            };
        default:
            return initialState;
    }
}
