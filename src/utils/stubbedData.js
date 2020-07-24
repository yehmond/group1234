import { initializeHours } from "./utils";
import pic1 from "../images/barbershop.png";
import pic2 from "../images/home-cover.jpg";
import pic3 from "../images/home-cover1.jpg";
import pic4 from "../images/home-cover2.jpg";
import profilePic from "../images/barber_profile_pic.png";
import moment from "moment";

export const imageList = [pic1, pic2, pic3, pic4];

const mockReviews = [
    {
        rating: 4,
        text:
            "I have had two cuts, and both outcomes have been above and beyond what was expected! Great service, comfortable atmosphere, experienced staff, and very competitive prices. Highly recommended!",
        name: "Bob",
    },
    {
        rating: 5,
        text:
            "I have had two cuts, and both outcomes have been above and beyond what was expected! Great service, comfortable atmosphere, experienced staff, and very competitive prices. Highly recommended!",
        name: "Joe",
    },
    {
        rating: 4,
        text:
            "I have had two cuts, and both outcomes have been above and beyond what was expected! Great service, comfortable atmosphere, experienced staff, and very competitive prices. Highly recommended!",
        name: "Carol",
    },
    {
        rating: 3,
        text:
            "I have had two cuts, and both outcomes have been above and beyond what was expected! Great service, comfortable atmosphere, experienced staff, and very competitive prices. Highly recommended!",
        name: "Jerry",
    },
];

export const mockBarbers = [
    {
        id: "123",
        name: "Billy Barber",
        description:
            "Barbers cut and style men’s hair. They may also provide other grooming services, such as shaving, beard trimming or hair treatments. Most barbers work in fairly small barbers' shops which serve customers in their local areas.",
        picture: profilePic,
        timeslot: 30,
        specialties: ["Haircut", "Shaving"],
    },
    {
        id: "124",
        name: "Bobby Barber",
        description:
            "Barbers cut and style men’s hair. They may also provide other grooming services, such as shaving, beard trimming or hair treatments. Most barbers work in fairly small barbers' shops which serve customers in their local areas.",
        picture: profilePic,
        timeslot: 30,
        specialties: ["Haircut", "Shaving"],
    },
    {
        id: "125",
        name: "Barney Barber",
        description:
            "Barbers cut and style men’s hair. They may also provide other grooming services, such as shaving, beard trimming or hair treatments. Most barbers work in fairly small barbers' shops which serve customers in their local areas.",
        picture: profilePic,
        timeslot: 30,
        specialties: ["Haircut", "Shaving"],
    },
    {
        id: "126",
        name: "Brody Barber",
        description:
            "Barbers cut and style men’s hair. They may also provide other grooming services, such as shaving, beard trimming or hair treatments. Most barbers work in fairly small barbers' shops which serve customers in their local areas.",
        picture: profilePic,
        timeslot: 30,
        specialties: ["Haircut", "Shaving"],
    },
];

export const mockStore = {
    id: "123",
    name: "Billy's Barbershop",
    address: "123 Main Street",
    lat: 49.2827,
    lon: -123.1207,
    city: "Vancouver",
    province: "BC",
    website: "www.billysbarbershop.com",
    phoneNumber: "(604) 123-4567",
    description:
        "A great barbershop lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    servicesOffered: ["Haircut", "Shaving", "Hair color", "Eyebrows", "Nails"],
    price: 4,
    photos: imageList,
    hours: initializeHours(),
    reviews: mockReviews,
    barbers: mockBarbers,
};

const event1 = {
    title: "Elvis Presley",
    start: moment("2020-07-01 09:30").toDate(),
    end: moment("2020-07-01 09:30").add(30, "minutes").toDate(),
    allDay: false,
    barberId: "123",
};

const event2 = {
    title: "Ringo Starr",
    start: moment("2020-07-01 12:30").toDate(),
    end: moment("2020-07-01 12:30").add(60, "minutes").toDate(),
    allDay: false,
    barberId: "124",
};

const event3 = {
    title: "John Lennon",
    start: moment("2020-07-02 10:00").toDate(),
    end: moment("2020-07-02 10:30").add(30, "minutes").toDate(),
    allDay: false,
    barberId: "123",
};

const event4 = {
    title: "Bob Saget",
    start: moment("2020-07-03 11:30").toDate(),
    end: moment("2020-07-03 11:30").add(30, "minutes").toDate(),
    allDay: false,
    barberId: "124",
};

const event5 = {
    title: "Ted Danson",
    start: moment("2020-07-01 15:30").toDate(),
    end: moment("2020-07-01 15:30").add(45, "minutes").toDate(),
    allDay: false,
    barberId: "123",
};

export const events = [event1, event2, event3, event4, event5];
// export const resources = [
//     {resourceId: '1', name: 'Billy Barber'},
//     {resourceId: '2', name: 'Bobby Barber'},
//     {resourceId: '3', name: 'Barney Barber'}
// ]
