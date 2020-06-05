import { Guid } from "guid-typescript";
import {
    GET_STORE,
    StoreTypes,
} from "../types/storeActionTypes"
import { Barbershop, initializeHours } from "../types/barbershop";

const initState: Array<Barbershop> = [];

export default function storeReducer(
    initialState = initState,
    action: StoreTypes
): Array<Barbershop> {
    switch (action.type) {
        case GET_STORE:
            console.log("storeReducer: GET_STORE");
            const placeholder = {
                id: Guid.create(),
                name: "TestName",
                address: "1234 Test Address",
                city: "Vancouver",
                province: "BC",
                website: "www.test.com",
                phoneNumber: "7781234567",
                description: "This is a test description",
                hours: initializeHours(),
                price: 10,
                photos: [],
                servicesOffered: [],
            };
            // TODO implement backend function
            return [
                placeholder
            ]

        default:
            return initialState;
    }
}