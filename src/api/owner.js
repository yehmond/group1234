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
    baseURL: "http://localhost:5000/api",
});

/*************
 *
 * Name:     getStoreById
 *
 * Purpose:  Returns detailed store information and statistics
 *
 * Parms:    (string)     store_id    - store_id of the store to be returned
 *
 * Return:   SUCCESS            - {status: 200, store: {}, reservations: [], statistics: {}, reviews: []}
 *           NOT FOUND          - {status: 404}
 *           SERVER ERROR       - {status: 500}
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
        response.data.status = response.status;
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return { status: error.response.status };
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
 * Return:   SUCCESS            - {status: 200, reservations: []}
 *           NOT FOUND          - {status: 404}
 *           SERVER ERROR       - {status: 500}
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
        const response = await instance.get(
            "/owner/barber/" + store_id + "/" + barber_id
        );
        response.data.status = response.status;
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return { status: error.response.status };
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
 *
 * Return:   SUCCESS            - {status: 200, barber_id: string}
 *           NOT FOUND          - {status: 404}
 *           SERVER ERROR       - {status: 500}
 *
 * Notes:    none
 *
 **************/
async function registerBarber(name, description, picture, stores, services) {
    if (name.length === 0) {
        alert("owner/registerBarber: name is invalid");
        throw Error("owner/registerBarber: name is invalid");
    }
    if (description.length === 0) {
        alert("owner/registerBarber: description is invalid");
        throw Error("owner/registerBarber: description is invalid");
    }
    if (picture.length === 0) {
        alert("owner/registerBarber: picture is invalid");
        throw Error("owner/registerBarber: picture is invalid");
    }
    if (stores.length === 0) {
        alert("owner/registerBarber: stores is invalid");
        throw Error("owner/registerBarber: stores is invalid");
    }
    if (services.length === 0) {
        alert("owner/registerBarber: services is invalid");
        throw Error("owner/registerBarber: services is invalid");
    }

    let body = {
        name,
        description,
        picture,
        stores,
        services,
    };

    try {
        const response = await instance.post("/owner/barber/", body);
        response.data.status = response.status;
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return { status: error.response.status };
    }
}

/*************
 *
 * Name:     registerStore
 *
 * Purpose:  Returns store_id of the newly added store
 *
 * Parms:    (string)  name          - name of the store
 *           (string)  address       - address of the store
 *           (string)  city          - city of the store
 *           (string)  province      - province of the store
 *           (string)  description   - description of the store
 *           (number)  price         - price range of the store
 *           (number)  lat           - latitude of the store
 *           (number)  lon           - longitude of the store
 *           (string)  website       - website of the store
 *           (string)  phone_number  - phone number of the store
 *           (array[string])             pictures    - array of pictures in base64 string
 *           (array[SERVICES_OFFERED])   services    - array of services
 *           (array[{isOpen: boolean, from: string, to: string}]) hours   - store hours array size of 7, with hours in military 0000 to 2400 format
 *           (array[string])             barbers     - array of barber_ids that works at the store, need to ensure ids are valid
 *
 * Return:   SUCCESS            - {status: 200, store_id: string}
 *           NOT FOUND          - {status: 404}
 *           SERVER ERROR       - {status: 500}
 *
 * Notes:    none
 *
 **************/
async function registerStore(
    name,
    address,
    city,
    province,
    description,
    price,
    lat,
    lon,
    website,
    phone_number,
    pictures,
    services,
    hours,
    barbers
) {
    if (name.length === 0) {
        alert("owner/registerStore: name is invalid");
        throw Error("owner/registerStore: name is invalid");
    }
    if (address.length === 0) {
        alert("owner/registerStore: address is invalid");
        throw Error("owner/registerStore: address is invalid");
    }
    if (city.length === 0) {
        alert("owner/registerStore: city is invalid");
        throw Error("owner/registerStore: city is invalid");
    }
    if (province.length === 0) {
        alert("owner/registerStore: province is invalid");
        throw Error("owner/registerStore: province is invalid");
    }
    if (description.length === 0) {
        alert("owner/registerStore: description is invalid");
        throw Error("owner/registerStore: description is invalid");
    }
    if (price.length === 0) {
        alert("owner/registerStore: price is invalid");
        throw Error("owner/registerStore: price is invalid");
    }
    if (lat.length === 0) {
        alert("owner/registerStore: lat is invalid");
        throw Error("owner/registerStore: lat is invalid");
    }
    if (lon.length === 0) {
        alert("owner/registerStore: lon is invalid");
        throw Error("owner/registerStore: lon is invalid");
    }
    if (website.length === 0) {
        alert("owner/registerStore: website is invalid");
        throw Error("owner/registerStore: website is invalid");
    }
    if (phone_number.length === 0) {
        alert("owner/registerStore: phone_number is invalid");
        throw Error("owner/registerStore: phone_number is invalid");
    }
    if (pictures.length === 0) {
        alert("owner/registerStore: pictures is invalid");
        throw Error("owner/registerStore: pictures is invalid");
    }
    if (services.length === 0) {
        alert("owner/registerStore: services is invalid");
        throw Error("owner/registerStore: services is invalid");
    }
    if (hours.length === 0) {
        alert("owner/registerStore: hours is invalid");
        throw Error("owner/registerStore: hours is invalid");
    }
    if (barbers.length === 0) {
        alert("owner/registerStore: barbers is invalid");
        throw Error("owner/registerStore: barbers is invalid");
    }

    let body = {
        name,
        address,
        city,
        province,
        description,
        price,
        lat,
        lon,
        website,
        phone_number,
        pictures,
        services,
        hours,
        barbers,
    };

    try {
        const response = await instance.post("/owner/store/", body);
        response.data.status = response.status;
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return { status: error.response.status };
    }
}

export default {
    getStoreById,
    getBarberReservations,
    registerBarber,
    registerStore,
};
