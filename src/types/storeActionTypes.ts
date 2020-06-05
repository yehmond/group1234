export const GET_STORE = "GET_STORE";

interface GetStoreAction {
    type: typeof GET_STORE;
    id: string;
}

export type StoreTypes = GetStoreAction;
