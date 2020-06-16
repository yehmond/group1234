import { PRICE_RANGE, SERVICES_OFFERED } from "../utils/constants";

const initState = {
    price: createObjectWithTrueValues(PRICE_RANGE),
    rating: 1,
    services: createObjectWithTrueValues(SERVICES_OFFERED),
};

export default function filterReducer(initialState = initState, action) {
    switch (action.type) {
        case "SET_PRICE": {
            if (allValuesAreFalse(action.price)) {
                return {
                    ...initialState,
                    price: createObjectWithTrueValues(PRICE_RANGE),
                };
            }
            return {
                ...initialState,
                price: action.price,
            };
        }
        case "SET_SERVICE":
            if (allValuesAreFalse(action.services)) {
                return {
                    ...initialState,
                    services: createObjectWithTrueValues(SERVICES_OFFERED),
                };
            }
            return {
                ...initialState,
                services: action.services,
            };
        case "SET_RATING":
            return {
                ...initialState,
                rating: action.rating,
            };
        default:
            return initialState;
    }
}

function allValuesAreFalse(obj) {
    return Object.keys(obj).every((key) => obj[key] === false);
}

function createObjectWithTrueValues(keys) {
    return Object.fromEntries(keys.map((key) => [key, true]));
}
