import { GET_STORE, StoreTypes } from "../types/storeActionTypes";

export function getStore(id: string): StoreTypes {
    return {
        type: GET_STORE,
        id: id,
    };
}
