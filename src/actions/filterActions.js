export function setPrice(priceObj) {
    return {
        type: "SET_PRICE",
        price: priceObj,
    };
}

export function setService(services) {
    return {
        type: "SET_SERVICE",
        services,
    };
}

export function setRating(rating) {
    return {
        type: "SET_RATING",
        rating,
    };
}
