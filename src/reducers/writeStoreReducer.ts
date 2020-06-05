
import { StoreTypes, ADD_STORE, REMOVE_STORE } from "../types/storeActionTypes";
import { Barbershop } from "../types/barbershop";

const emptyStoreArr: Array<Barbershop> = [];

export default function writeStoreReducer(
    currState = emptyStoreArr,
    action: StoreTypes
): Array<Barbershop> {
    switch (action.type) {
        case ADD_STORE:
            console.log("storeReducer: ADD_STORE");
            return [
                ...currState,
                action.payload
            ];

        case REMOVE_STORE:
            console.log("storeReducer: REMOVE_STORE");
            const index = currState.map(function (e) { return e.id; }).indexOf(action.id);
            currState.splice(index, 1);
            return currState;

        default:
            return currState;
    }
}