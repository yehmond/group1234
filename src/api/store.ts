/* File for calling backend API */

import { Barbershop, initializeBarbershop } from "../types/barbershop";

export async function getStore(id: string) {
    // placeholder
    return Promise.resolve(initializeBarbershop());
}

export async function addStore(store: Barbershop) {
    // placeholder
}

export async function removeStore(id: string) {
    // placeholder
}

