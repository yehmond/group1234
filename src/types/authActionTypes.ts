export interface Auth {
    isLoggedIn: boolean;
    role: string;
}

export const LOGIN_OWNER = "LOGIN_OWNER";
export const LOGIN_CUSTOMER = "LOGIN_CUSTOMER";
export const LOGOUT = "LOGOUT";

export enum USER_TYPES {
    CUSTOMER = "CUSTOMER",
    OWNER = "OWNER",
}

interface LoginOwnerAction {
    type: typeof LOGIN_OWNER;
    payload: Auth;
}

interface LoginCustomerAction {
    type: typeof LOGIN_CUSTOMER;
    payload: Auth;
}

interface LogoutAction {
    type: typeof LOGOUT;
    payload: Auth;
}

export interface AuthState {
    isLoggedIn: boolean;
    role: string;
}

export type AuthTypes = LoginOwnerAction | LoginCustomerAction | LogoutAction;
