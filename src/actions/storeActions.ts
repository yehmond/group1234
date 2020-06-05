import { StoreTypes, ADD_STORE, REMOVE_STORE, FETCH_STORES } from "../types/storeActionTypes";
import { Barbershop } from "../types/barbershop";
import { Guid } from "guid-typescript";
import axios from "axios";

export function fetchStores(): StoreTypes {
    return {
        type: FETCH_STORES
    }
}

export function getStore(id: Guid) {
    // TODO abstract url
    const currId: string = id.toString();
    return function (dispatch: any) {
        return axios.get("http://localhost:5000/store/get", {
            params: {
                id: currId
            }
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                return response.data;
            }
            else {
                return Promise.reject("response is not 200");
            }
        }).catch((error) => {
            console.error("getStore: problem getting store from database: " + error);
        });
    }
}

export function addStore(store: Barbershop) {
    // TODO abstract url
    // TODO convert image into data and contentType
    const currId: string = store.id.toString();
    return function(dispatch: any) {
        return axios.post("http://localhost:5000/store/add", {
            id: currId,
            name: store.name,
            address: store.address,
            city: store.city,
            province: store.province,
            description: store.description,
            servicesOffered: store.servicesOffered,
            price: store.price,
            website: store.website,
            phoneNumber: store.phoneNumber,
            photo: [{ data: "", contentType: ""}],
            hours: store.hours
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                dispatch(addStoreHelper(store));
            }
            else {
                Promise.reject("response is not 200");
            }
        }).catch((error) => {
            console.error("addStore: problem adding store to database: " + error);
        });
    }
}

function addStoreHelper(store: Barbershop): StoreTypes {
    return {
        type: ADD_STORE,
        payload: store
    }
}

export function removeStore(id: Guid) {
    //TODO abstract url
    const currId: string = id.toString();
    return function(dispatch: any) {
        return axios.post("http://localhost:5000/store/remove", {
            id: currId
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                dispatch(removeStoreHelper(id));
            }
            else {
                Promise.reject("response is not 200");
            }
        }).then((error) => {
            console.error("removeStore: problem removing store from database: " + error);
        });
    }
}

function removeStoreHelper(id: Guid): StoreTypes {
    return {
        type: REMOVE_STORE,
        id
    }
}
