import { Guid } from "guid-typescript";

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
    let hours: Day[] = [];
    for (let i = 0; i < 7; i++) {
        hours.push({} as Day);
    }
    return hours;
}

export function initializeBarbershop(): Barbershop {
    return {
        address: "",
        city: "",
        description: "",
        hours: [],
        price: 0,
        id: Guid.create(),
        name: "",
        photos: [],
        province: "",
        servicesOffered: [],
    };
}
