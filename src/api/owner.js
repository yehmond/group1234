/* eslint-disable no-console */
/*************
 *
 * Filename:  owner.js
 *
 * Purpose:   API functions for backend interactions related to owner-end
 *
 **************/

/* Include files */
import axios from "axios";

/* Local constants */
const instance = axios.create({
    // TODO abstract baseURL
    baseURL: "http://localhost:5000/api/owner",
});

/*************
 *
 * Name:     getStore
 *
 * Purpose:  Returns detailed store information, reviews, and reservation
 *
 * Parms:    (object)     body    - at least one of the following properties, if both are given an AND will be returned
 *               (number)    store_id    - return specific store
 *               (number)    owner_id    - return list of stores owned by owner_id
 *
 * Return:   SUCCESS            - [{store_id: number, store: {}, reservations: [], reviews: [], barbers: []}]
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    The function will return an array regardless of amount of entries returned
 *
 **************/
async function getStore(body) {
    if (!body.hasOwnProperty("store_id") && !body.hasOwnProperty("owner_id")) {
        alert("owner/getStore: missing input parameters");
        return null;
    }

    try {
        const response = await instance.get("/store", { params: body });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     registerStore
 *
 * Purpose:  Returns store_id of the newly added store
 *
 * Parms:    (number)  owner_id      - user_id of the owner
 *           (string)  name          - name of the store
 *           (string)  address       - address of the store
 *           (string)  city          - city of the store
 *           (string)  province      - province of the store
 *           (string)  description   - description of the store
 *           (number)  price         - price range of the store
 *           (string)  website       - website of the store
 *           (string)  phone_number  - phone number of the store
 *           (array[string])             pictures    - array of pictures in base64 string
 *           (array[SERVICES_OFFERED])   services    - array of services
 *           (array[{isOpen: boolean, from: string, to: string}]) hours   - store hours array size of 7, with hours in military 0000 to 2400 format
 *
 * Return:   SUCCESS            - {store_id: number}
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function registerStore(
    owner_id,
    name,
    address,
    city,
    province,
    description,
    price,
    website,
    phone_number,
    pictures,
    services,
    hours
) {
    if (owner_id.length === 0) {
        alert("owner/registerStore: owner_id is invalid");
        return null;
    }
    if (name.length === 0) {
        alert("owner/registerStore: name is invalid");
        return null;
    }
    if (address.length === 0) {
        alert("owner/registerStore: address is invalid");
        return null;
    }
    if (city.length === 0) {
        alert("owner/registerStore: city is invalid");
        return null;
    }
    if (province.length === 0) {
        alert("owner/registerStore: province is invalid");
        return null;
    }
    if (description.length === 0) {
        alert("owner/registerStore: description is invalid");
        return null;
    }
    if (price.length === 0) {
        alert("owner/registerStore: price is invalid");
        return null;
    }
    if (website.length === 0) {
        alert("owner/registerStore: website is invalid");
        return null;
    }
    if (phone_number.length === 0) {
        alert("owner/registerStore: phone_number is invalid");
        return null;
    }
    if (pictures.length === 0) {
        alert("owner/registerStore: pictures is invalid");
        return null;
    }
    if (services.length === 0) {
        alert("owner/registerStore: services is invalid");
        return null;
    }
    if (hours.length === 0) {
        alert("owner/registerStore: hours is invalid");
        return null;
    }

    let body = {
        owner_id,
        name,
        address,
        city,
        province,
        description,
        price,
        website,
        phone_number,
        pictures,
        services,
        hours,
    };

    try {
        const response = await instance.post("/store", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     deleteStore
 *
 * Purpose:  Delete specific store and related reservations, reviews, and barbers that only works there
 *
 * Parms:    (object)     body    - at least one of the following properties, if both are given an AND will be returned
 *               (number)    store_id    - delete specific store
 *               (number)    owner_id    - delete list of stores owned by owner_id
 *
 * Return:   SUCCESS            - {store_ids: [number], barber_ids: [number]}
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function deleteStore(body) {
    if (!body.hasOwnProperty("store_id") && !body.hasOwnProperty("owner_id")) {
        alert("owner/deleteStore: missing input parameters");
        return null;
    }

    try {
        const response = await instance.delete("/store", { params: body });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     getBarber
 *
 * Purpose:  Returns detailed barber information, statistics, reviews, and reservation
 *
 * Parms:    (object)     body    - at least one of the following properties, if both are given an AND will be returned
 *               (number)    barber_id   - return specific barber
 *               (number)    store_id    - return list of barbers working at store_id
 *
 * Return:   SUCCESS            - [{barber_id: number, barber {}, reservations: [], reviews: [], stores: []}]
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    The function will return an array regardless of amount of entries returned
 *
 **************/
async function getBarber(body) {
    if (!body.hasOwnProperty("barber_id") && !body.hasOwnProperty("store_id")) {
        alert("owner/getBarber: missing input parameters");
        return null;
    }

    try {
        const response = await instance.get("/barber", { params: body });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     registerBarber
 *
 * Purpose:  Returns barber_id of the newly added barber
 *
 * Parms:    (string)  name          - name of the store
 *           (string)  description   - description of the store
 *           (string)  picture       - picture in base64 string
 *           (array[{service: SERVICES_OFFERED, duration: number}])   services    - array of services along with the duration of its service
 *           (array[number])    store_ids    - array of store_ids the barber works at
 *           (array[{from: Date, to: Date}])   schedule   - array of weekly opening hours
 *
 * Return:   SUCCESS            - {barber_id: number}
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function registerBarber(
    name,
    description,
    picture,
    services,
    store_ids,
    schedule
) {
    if (name.length === 0) {
        alert("owner/registerBarber: name is invalid");
        return null;
    }
    if (description.length === 0) {
        alert("owner/registerBarber: description is invalid");
        return null;
    }
    if (picture.length === 0) {
        alert("owner/registerBarber: picture is invalid");
        return null;
    }
    if (services.length === 0) {
        alert("owner/registerBarber: services is invalid");
        return null;
    }
    if (store_ids.length === 0) {
        alert("owner/registerBarber: store_ids is invalid");
        return null;
    }
    if (schedule.length === 0) {
        alert("owner/registerBarber: schedule is invalid");
        return null;
    }

    let body = {
        name,
        description,
        picture,
        store_ids,
        services,
        schedule,
    };

    try {
        const response = await instance.post("/barber", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*************
 *
 * Name:     deleteBarber
 *
 * Purpose:  Delete specific barber and related reservations and reviews
 *
 * Parms:    (object)     body    - at least one of the following properties, if both are given an AND will be returned
 *               (number)    barber_id   - delete specific barber
 *               (number)    store_id    - delete list of barbers working at store_id
 *
 * Return:   SUCCESS            - {barber_ids: [number]}
 *           NOT FOUND          - null
 *           OTHER ERRORS       - null
 *
 * Notes:    none
 *
 **************/
async function deleteBarber(body) {
    if (!body.hasOwnProperty("barber_id") && !body.hasOwnProperty("store_id")) {
        alert("owner/getBarber: missing input parameters");
        return null;
    }

    try {
        const response = await instance.delete("/barber", { params: body });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export {
    getStore,
    registerStore,
    deleteStore,
    getBarber,
    registerBarber,
    deleteBarber,
};
