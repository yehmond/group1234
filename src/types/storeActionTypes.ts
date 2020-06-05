import { Barbershop } from "./barbershop";
import { Guid } from "guid-typescript";

export const FETCH_STORES = "FETCH_STORES";
export const GET_STORE = "GET_STORE";
export const ADD_STORE = "ADD_STORE";
export const REMOVE_STORE = "REMOVE_STORE";

export interface GetStoreInfoAction {
    type: typeof GET_STORE;
    id: string;
}

interface FetchStoresAction {
    type: typeof FETCH_STORES;
}

interface AddStoreAction {
    type: typeof ADD_STORE;
    payload: Barbershop;
}

interface RemoveStoreAction {
    type: typeof REMOVE_STORE;
    id: Guid;
}

export type StoreTypes = AddStoreAction | RemoveStoreAction | FetchStoresAction;
