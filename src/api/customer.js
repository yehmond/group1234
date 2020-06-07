/*************
 *
 * Filename:  customer.js
 *
 * Purpose:   API functions for backend interactions related to customer-end
 *
 **************/

/* Include files */
const axios = require("axios").default;

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
    // TODO
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
    // TODO
}

/*************
 * 
 * Name:     searchStore
 *
 * Purpose:  Search for stores that fit the optional parameters
 *
 * Parms:    (number)     count                  - number of stores to return
 *           (string)     name                   - (optional) name of the store
 *           (string)     location               - (optional) location to find stores around
 *           (array[SERVICES_OFFERED])  services - (optional) array of services offered
 *           (number)     rating                 - (optional) minimum rating
 *           (number)     price                  - (optional) maximum price level
 *
 * Return:   response.data            - {stores: [{store_id: string, picture: (base64) string, rating: number, price: number, services: array[SERVICES_OFFERED]}]}
 *           response.status          - 200: successful
 *
 * Notes:    for empty optional params, please use null as a placeholder
 *
 **************/
async function searchStore(count, name, location, services, rating, price) {
    // TODO
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
    // TODO
}

/*************
 * 
 * Name:     getReservations
 *
 * Purpose:  Gets a list of reservations filtered by params
 *
 * Parms:    (string)     user_id     - id of the user
 *           (Date)       start_time  - (optional) earliest review to return
 *           (Date)       end_time    - (optional) latest review to return
 *
 * Return:   response.data            - {reservations: []}
 *           response.status          - 200: successful
 *
 * Notes:    for empty optional params, please use null as a placeholder
 *
 **************/
async function getReservations(user_id, start_time, end_time) {
    // TODO
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
async function setReservation(user_id) {
    // TODO
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
    // TODO
}

module.exports = {
    getStoreById,
    getBarberReservations,
    searchStore,
    getReviews,
    getReservations,
    setReservation,
    removeReservation,
}