import { SET_PRICE, SET_RATING, SET_SERVICES } from "../actions/filterActions";

const initState = {
    price: [],
    rating: 1,
    services: [],
};

export default function filterReducer(initialState = initState, action) {
    switch (action.type) {
        case SET_PRICE: {
            return {
                ...initialState,
                price: action.price,
            };
        }
        case SET_SERVICES:
            return {
                ...initialState,
                services: action.services,
            };
        case SET_RATING:
            return {
                ...initialState,
                rating: action.rating,
            };
        default:
            return initialState;
    }
}
