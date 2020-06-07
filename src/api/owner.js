/*************
 *
 * Filename:  owner.js
 *
 * Purpose:   API functions for backend interactions related to owner-end
 *
 **************/

/* Include files */
const axios = require("axios").default;

/*************
 *
 * Name:     getStoreById
 *
 * Purpose:  Returns detailed store information and statistics
 *
 * Parms:    (string)     store_id    - store_id of the store to be returned
 *
 * Return:   response.data            - {store: {}, reservations: [], statistics: {}, reviews: []}
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
 * Purpose:  Returns detailed reservations
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
 * Name:     registerStore
 *
 * Purpose:  Returns store_id of the newly added store
 *
 * Parms:    (object)  store          - store object to register into database
 *
 * Return:   response.data            - {store_id: string}
 *           response.status          - 200: successful
 *
 * Notes:    none
 *
 **************/
async function registerStore(store) {
    // TODO
}

module.exports = {
    getStoreById,
    getBarberReservations,
    registerStore
}

