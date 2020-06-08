/*************
 *
 * Filename:  customer.js
 *
 * Purpose:   API functions for backend interactions related to customer-end
 *
 **************/

/* Include files */
const axios = require("axios").default;

/* Local constants */
const instance = axios.create({
    // TODO abstract baseURL
    baseURL: "http://localhost:5000/api"
});

/*************
 *
 * Name:     getStoreById
 *
 * Purpose:  Get a specific store for customer viewing
 *
 * Parms:    (string)     store_id    - store_id of the store to be returned
 *
 * Return:   response.data            - {store: {}, reservations: [], reviews: []}
 *           response.status          - 200: successful
 *
 * Notes:    none
 *
 **************/
async function getStoreById(store_id) {

    if (store_id.length === 0) {
        alert("customer/getStoreById: store_id is invalid");
        throw Error("customer/getStoreById: store_id is invalid");
    }

    try {
        const response = await instance.get("/customer/store/" + store_id);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

/*************
 *
 * Name:     getBarberReservations
 *
 * Purpose:  Get the time schedule of a specific barber
 *
 * Parms:    (string)     store_id    - store_id of the current store for the barber
 *           (string)     barber_id   - barber_id of the barber details to be returned
 *
 * Return:   response.data            - {reservations: []}
 *           response.status          - 200: successful
 *
 * Notes:    none
 *
 **************/
async function getBarberReservations(store_id, barber_id) {

    if (store_id.length === 0) {
        alert("customer/getBarberReservations: store_id is invalid");
        throw Error("customer/getBarberReservations: store_id is invalid");
    }
    if (barber_id.length === 0) {
        alert("customer/getBarberReservations: barber_id is invalid");
        throw Error("customer/getBarberReservations: barber_id is invalid");
    }

    try {
        const response = await instance.get("/customer/barber/" + store_id + "/" + barber_id);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

/*************
 *
 * Name:     searchStore
 *
 * Purpose:  Search for stores that fit the optional parameters
 *
 * Parms:    (number)     count                  - number of stores to return
 *           (object)     body                   - (optional) object body that can contain the following optional keys:
 *              (string)     store                  - name of the store
 *              (string)     city                   - city to find stores around
 *              (array[SERVICES_OFFERED])  services - array of services offered
 *              (number)     rating                 - minimum rating
 *              (number)     price                  - maximum price level
 *
 * Return:   response.data            - {stores: [{store_id: string, picture: (base64) string, rating: number, price: number, services: array[SERVICES_OFFERED]}]}
 *           response.status          - 200: successful
 *
 * Notes:    for empty optional params, omit the key from the object. If no optional params, please pass an empty object
 *
 **************/
async function searchStore(count, body) {

    // Base case
    if (count === 0) {
        return { stores: [] };
    }

    const query = Object.keys(body).map(function (key) {
        return key + '=' + encodeURIComponent(body[key]);
    }).join('&');

    try {
        const response = await instance.get("/customer/store/search/" + count + "/?" + query);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

/*************
 *
 * Name:     getReviews
 *
 * Purpose:  Gets a list of reviews made by the user
 *
 * Parms:    (string)     user_id     - id of the user
 *
 * Return:   response.data            - {reviews: []}
 *           response.status          - 200: successful
 *
 * Notes:    none
 *
 **************/
async function getReviews(user_id) {

    if (user_id.length === 0) {
        alert("customer/getReviews: user_id is invalid");
        throw Error("customer/getReviews: user_id is invalid");
    }

    try {
        // TODO add authorization header
        const response = await instance.get("/customer/reviews/" + user_id);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

/*************
 *
 * Name:     setReview
 *
 * Purpose:  Make a new review
 *
 * Parms:    (string)     user_id     - id of the user
 *           (string)     store_id    - id of the store
 *           (string)     barber_id   - id of the barber
 *           (string)     review      - message left by reviewer
 *           (number)     rating      - rating from 1 to 5
 *
 * Return:   response.data            - {reviews: []}
 *           response.status          - 200: successful
 *
 * Notes:    none
 *
 **************/
async function setReview(user_id, store_id, barber_id, review, rating) {

    if (user_id.length === 0) {
        alert("customer/setReview: user_id is invalid");
        throw Error("customer/setReview: user_id is invalid");
    }
    if (store_id.length === 0) {
        alert("customer/setReview: store_id is invalid");
        throw Error("customer/setReview: store_id is invalid");
    }
    if (barber_id.length === 0) {
        alert("customer/setReview: barber_id is invalid");
        throw Error("customer/setReview: barber_id is invalid");
    }
    if (review.length === 0) {
        alert("customer/setReview: review is invalid");
        throw Error("customer/setReview: review is invalid");
    }
    if (rating.length === 0) {
        alert("customer/setReview: rating is invalid");
        throw Error("customer/setReview: rating is invalid");
    }

    let body = {};
    body.user_id = user_id;
    body.store_id = store_id;
    body.barber_id = barber_id;
    body.review = review;
    body.rating = rating;

    try {
        // TODO add authorization header
        const response = await instance.post("/customer/reviews", body);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

/*************
 *
 * Name:     getReservations
 *
 * Purpose:  Gets a list of reservations filtered by params
 *
 * Parms:    (string)     user_id     - id of the user
 *           (object)     body                   - (optional) object body that can contain the following optional keys:
 *              (Date)       start_time  - earliest review to return
 *              (Date)       end_time    - latest review to return
 *
 * Return:   response.data            - {reservations: []}
 *           response.status          - 200: successful
 *
 * Notes:    for empty optional params, omit the key from the object. If no optional params, please pass an empty object
 *
 **************/
async function getReservations(user_id, body) {

    if (user_id.length === 0) {
        alert("customer/getReservations: user_id is invalid");
        throw Error("customer/getReservations: user_id is invalid");
    }

    if (body.hasOwnProperty("start_time")) {
        body.start_time.toISOString();
    }
    if (body.hasOwnProperty("end_time")) {
        body.end_time.toISOString();
    }

    const query = Object.keys(body).map(function (key) {
        return key + '=' + encodeURIComponent(body[key]);
    }).join('&');

    try {
        // TODO add authorization header
        const response = await instance.get("/customer/reservations/" + user_id + "/?" + query);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

/*************
 *
 * Name:     setReservation
 *
 * Purpose:  Make a new reservation
 *
 * Parms:    (string)     user_id           - id of the user
 *           (string)     store_id          - store id of the store
 *           (string)     barber_id         - barber id of the barber
 *           (Date)       start_time        - start time of the reservation
 *           (SERVICES_OFFERED) service     - service offered
 *
 * Return:   response.data            - {reservation_id: string, end_time: Date}
 *           response.status          - 200: successful
 *
 * Notes:    none
 *
 **************/
async function setReservation(user_id, store_id, barber_id, start_time, service) {

    if (user_id.length === 0) {
        alert("customer/setReservation: user_id is invalid");
        throw Error("customer/setReservation: user_id is invalid");
    }
    if (store_id.length === 0) {
        alert("customer/setReservation: store_id is invalid");
        throw Error("customer/setReservation: store_id is invalid");
    }
    if (barber_id.length === 0) {
        alert("customer/setReservation: barber_id is invalid");
        throw Error("customer/setReservation: barber_id is invalid");
    }
    // TODO check for valid date
    if (service.length === 0) {
        alert("customer/setReservation: service is invalid");
        throw Error("customer/setReservation: service is invalid");
    }

    let body = {};
    body.user_id = user_id;
    body.store_id = store_id;
    body.barber_id = barber_id;
    body.start_time = start_time;
    body.service = service;

    try {
        // TODO add authorization header
        const response = await instance.post("/customer/reservations/", body);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

/*************
 *
 * Name:     removeReservation
 *
 * Purpose:  Remove a previously made reservation
 *
 * Parms:    (string)     reservation_id    - id of the reservation
 *
 * Return:   response.status          - 200: successful
 *
 * Notes:    none
 *
 **************/
async function removeReservation(reservation_id) {

    if (reservation_id.length === 0) {
        alert("customer/removeReservation: reservation_id is invalid");
        throw Error("customer/removeReservation: reservation_id is invalid");
    }

    let body = {};
    body.reservation_id = reservation_id;

    try {
        // TODO add authorization header
        const response = await instance.delete("/customer/reservations/" + reservation_id);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // TODO error handling
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
}

module.exports = {
    getStoreById,
    getBarberReservations,
    searchStore,
    getReviews,
    setReview,
    getReservations,
    setReservation,
    removeReservation,
};