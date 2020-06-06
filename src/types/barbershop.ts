import { Guid } from "guid-typescript";
import { DEFAULT_FROM, DEFAULT_TO } from "../utils/constants";

export interface Barbershop {
    id: Guid;
    name: string;
    address: string;
    city: string;
    province: string;
    description: string;
    servicesOffered: string[];
    // price as a scale from 1-4
    price: number;
    website: string;
    phoneNumber: string;
    photos: File[];
    // weekdays index from 0-6, beginning on Monday
    hours: Day[];
}

export interface Day {
    isOpen: boolean;
    from: string;
    to: string;
}

export function initializeHours(): Day[] {
    const hours: Day[] = [];
    for (let i = 0; i < 7; i++) {
        hours.push({ isOpen: true, from: DEFAULT_FROM, to: DEFAULT_TO });
    }
    return hours;
}

export function initializeBarbershop(): Barbershop {
    return {
        id: Guid.create(),
        name: "",
        address: "",
        city: "",
        province: "",
        website: "",
        phoneNumber: "",
        description: "",
        hours: initializeHours(),
        price: 0,
        photos: [],
        servicesOffered: [],
    };
}
