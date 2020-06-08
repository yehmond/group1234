/*************
 *
 * Filename:  owner.js
 *
 * Purpose:   API functions for backend interactions related to owner-end
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

    if (store_id.length === 0) {
        alert("owner/getStoreById: store_id is invalid");
        throw Error("owner/getStoreById: store_id is invalid");
    }

    try {
        const response = await instance.get("/owner/store/" + store_id);
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

    if (store_id.length === 0) {
        alert("owner/getBarberReservations: store_id is invalid");
        throw Error("owner/getBarberReservations: store_id is invalid");
    }
    if (barber_id.length === 0) {
        alert("owner/getBarberReservations: barber_id is invalid");
        throw Error("owner/getBarberReservations: barber_id is invalid");
    }

    try {
        const response = await instance.get("/owner/barber/" + store_id + "/" + barber_id);
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

    // TODO need to change the param into params
    try {
        const response = await instance.post("/owner/store/", store);
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
    registerStore,
};
