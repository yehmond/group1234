import { SIGN_OUT, SIGN_IN_CUSTOMER, SIGN_IN_OWNER } from "../actions/authActions";

export default function authReducer(
    initialState = { isLoggedIn: true, role: "CUSTOMER" },
    action
) {
    switch (action.type) {
        case SIGN_IN_OWNER:
            return {
                isLoggedIn: true,
                role: "OWNER",
            };
        case SIGN_IN_CUSTOMER:
            return {
                isLoggedIn: true,
                role: "CUSTOMER",
            };
        case SIGN_OUT:
            return {
                isLoggedIn: false,
                role: "",
            };
        default:
            return initialState;
    }
}
