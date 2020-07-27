/* eslint-disable no-console */
/*************
 *
 * Filename:  customer.js
 *
 * Purpose:   API functions for backend interactions related to customer-end
 *
 **************/

/* Include files */
import axios from "axios";
import { SERVICES_OFFERED } from "../utils/constants";

/* Local constants */
const instance = axios.create({
    // TODO abstract baseURL
    baseURL:
        (process.env.REACT_APP_BASE_URL || "http://localhost:5000") +
        "/api/customer",
});

/*************
 *
 * Name:     getStore
 *
 * Purpose:  Return all store information needed for specific store page
 *
 * Parms:    (number)     store_id    - store_id of the store to be returned
 *
 * Return:   SUCCESS            - {store_id: number, store: {}, reservations: [], reviews: [], barbers: []}
 *           NOT FOUND          - null
 *           SERVER ERROR       - null
 *
 * Notes:    none
 *
 **************/
async function getStore(store_id) {
    if (store_id.length === 0) {
        alert("customer/getStore: store_id is invalid");
        return null;
    }

    try {
        const response = await instance.get("/store/" + store_id);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     searchStores
 *
 * Purpose:  Search for stores that fit the optional parameters
 *
 * Parms:    (number)     count                  - number of stores to return
 *           (object)     body                   - (optional) object body that can contain the following optional keys:
 *              (number)     startIndex             - index of the first store object to return
 *              (string)     string                 - string to match for a store
 *              (array[string)     neighbourhood    - neighbourhoods to find stores around
 *              (array[SERVICES_OFFERED])  services - array of services offered
 *              (number)     rating                 - minimum rating
 *              (array[number])     price           - price array of prices (1-3)
 *              (Date)       date                   - date to inquire
 *              (Date)       time                   - time to inquire
 *              (number)     available_count        - number of available times to return per store
 *               
 *
 * Return:   SUCCESS            - {count: number, stores: [{..., available_time: [{barber_id, number, barber_name: string, from: Date}]} }]}
 *           NOT FOUND          - null
 *           SERVER ERROR       - null
 *
 * Notes:    for empty optional params, omit the key from the object. If no optional params, please pass an empty object
 *
 **************/
async function searchStores(count, body) {
    if (count === 0) {
        alert("customer/searchStores: missing counts");
        return null;
    }

    try {
        const response = await instance.get("/store/search/" + count, {
            params: body,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     getNeighbourhoods
 *
 * Purpose:  Get availible neighbourhoods up to a certain limit of entries
 *
 * Parms:    (string)     city                  - city to search in
 *           (string)     province              - province to search in
 *           (number)     limit                 - limit of entries to search
 *
 * Return:   SUCCESS            - [string]
 *           NOT FOUND          - null
 *           SERVER ERROR       - null
 *
 * Notes:
 *
 **************/
async function getNeighbourhoods(city, province, limit) {
    if (city === 0) {
        alert("customer/getNeighbourhoods: missing city");
        return null;
    }
    if (province === 0) {
        alert("customer/getNeighbourhoods: missing province");
        return null;
    }
    if (limit === 0) {
        alert("customer/getNeighbourhoods: missing limit");
        return null;
    }

    const body = {
        city,
        province,
        limit,
    };

    try {
        const response = await instance.get("/neighbourhoods", { params: body });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
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
 * Return:   SUCCESS            - {reviews: []}
 *           NOT FOUND          - null
 *           SERVER ERROR       - null
 *
 * Notes:    none
 *
 **************/
async function getReviews(user_id) {
    if (user_id.length === 0) {
        alert("customer/getReviews: user_id is invalid");
        return null;
    }

    try {
        const response = await instance.get("/review/" + user_id);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     registerReview
 *
 * Purpose:  Make a new review
 *
 * Parms:    (number)     user_id     - id of the user
 *           (number)     store_id    - id of the store
 *           (number)     barber_id   - id of the barber
 *           (string)     review      - message left by reviewer
 *           (number)     rating      - rating from 1 to 5
 *           (SERVICES_OFFERED)  service   - type of service
 *
 * Return:   SUCCESS            - {review_id: string}
 *           NOT FOUND          - null
 *           SERVER ERROR       - null
 *
 * Notes:    none
 *
 **************/
async function registerReview(
    user_id,
    store_id,
    barber_id,
    review,
    rating,
    service
) {
    if (user_id.length === 0) {
        alert("customer/registerReview: user_id is invalid");
        return null;
    }
    if (store_id.length === 0) {
        alert("customer/registerReview: store_id is invalid");
        return null;
    }
    if (barber_id.length === 0) {
        alert("customer/registerReview: barber_id is invalid");
        return null;
    }
    if (review.length === 0) {
        alert("customer/registerReview: review is invalid");
        return null;
    }
    if (rating.length === 0) {
        alert("customer/registerReview: rating is invalid");
        return null;
    }
    if (service.length === 0) {
        alert("customer/registerReview: service is invalid");
        return null;
    }

    let body = {
        user_id,
        store_id,
        barber_id,
        review,
        rating,
        service,
    };

    try {
        const response = await instance.post("/review", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     updateReview
 *
 * Purpose:  Update a previously made review
 *
 * Parms:    (number)     review_id   - id of the review
 *           (object)     body        - at least one of the following properties that will be updated
 *               (string)     review      - message left by reviewer
 *               (number)     rating      - rating from 1 to 5
 *
 * Return:   SUCCESS            - {review_id: number}
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function updateReview(review_id, body) {
    if (review_id.length === 0) {
        alert("customer/updateReview: review_id is invalid");
        return null;
    }
    body.review_id = review_id;

    try {
        const response = await instance.put("/review", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     deleteReview
 *
 * Purpose:  Remove a previously made review
 *
 * Parms:    (number)     review_id   - id of the review
 *
 * Return:   SUCCESS            - {review_id: number}
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function deleteReview(review_id) {
    if (review_id.length === 0) {
        alert("customer/deleteReview: review_id is invalid");
        return null;
    }

    try {
        const response = await instance.delete("/review/" + review_id);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     getReservations
 *
 * Purpose:  Gets a list of reservations filtered by params
 *
 * Parms:    (number)     user_id     - id of the user
 *           (object)     body        - (optional) object body that can contain the following optional keys:
 *              (Date)       from  - earliest review to return
 *              (Date)       to    - latest review to return
 *
 * Return:   SUCCESS            - {reservations: []}
 *           NOT FOUND          - null
 *           SERVER ERROR       - null
 *
 * Notes:    for empty optional params, omit the key from the object. If no optional params, please pass an empty object
 *
 **************/
async function getReservations(user_id, body) {
    if (user_id.length === 0) {
        alert("customer/getReservations: user_id is invalid");
        return null;
    }

    try {
        const response = await instance.get("/reservation/" + user_id, {
            params: body,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     getAvailability
 *
 * Purpose:  Get free times for a reservation
 *
 * Parms:    (number) store_id              - store to get availibility at
 *           (Date)   date                  - date desired
 *           (SERVICES_OFFERED) service     - service desired
 *           (object)     body              - (optional) object body that can contain the following optional keys:
 *               (number)   barber_id       - barber desired
 *
 * Return:   SUCCESS            - [{barber_id: number, barber_name: string, picture: (base64) string, available_time: [{from: Date, to: Date}]}]
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function getAvailability(store_id, date, service, body) {
    if (store_id.length === 0) {
        alert("customer/getFreeReservationTimes: store_id is invalid");
        return null;
    }
    if (date.length === 0) {
        alert("customer/getFreeReservationTimes: date is invalid");
        return null;
    }
    if (service.length === 0 && !SERVICES_OFFERED.includes(service)) {
        alert("customer/getReservations: service is invalid");
        return null;
    }
    body.store_id = store_id;
    body.date = date;
    body.service = service;

    try {
        const response = await instance.get("/availability", { params: body });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     registerReservation
 *
 * Purpose:  Make a new reservation
 *
 * Parms:    (number)     user_id           - id of the user
 *           (number)     store_id          - store id of the store
 *           (number)     barber_id         - barber id of the barber
 *           (Date)       from              - start time of the reservation
 *           (SERVICES_OFFERED) service     - service offered
 *
 * Return:   SUCCESS            - {reservation_id: string, to: Date}
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function registerReservation(user_id, store_id, barber_id, from, service) {
    if (user_id.length === 0) {
        alert("customer/registerReservation: user_id is invalid");
        return null;
    }
    if (store_id.length === 0) {
        alert("customer/registerReservation: store_id is invalid");
        return null;
    }
    if (barber_id.length === 0) {
        alert("customer/registerReservation: barber_id is invalid");
        return null;
    }
    if (typeof from !== Date) {
        alert("customer/registerReservation: from is invalid");
        return null;
    }
    if (service.length === 0) {
        alert("customer/registerReservation: service is invalid");
        return null;
    }

    let body = {
        user_id,
        store_id,
        barber_id,
        from,
        service,
    };

    try {
        const response = await instance.post("/reservation", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     deleteReservation
 *
 * Purpose:  Remove a previously made reservation
 *
 * Parms:    (string)     reservation_id    - id of the reservation
 *
 * Return:   SUCCESS            - {reservation_id: number}
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function deleteReservation(reservation_id) {
    if (reservation_id.length === 0) {
        alert("customer/deleteReservation: reservation_id is invalid");
        return null;
    }

    try {
        const response = await instance.delete("/reservation/" + reservation_id);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export {
    getStore,
    searchStores,
    getReviews,
    registerReview,
    updateReview,
    deleteReview,
    getAvailability,
    getReservations,
    registerReservation,
    deleteReservation,
    getNeighbourhoods,
};
