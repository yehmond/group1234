import { initializeHours } from "./utils";
import pic1 from "../images/barbershop.png";
import pic2 from "../images/home-cover.jpg";
import pic3 from "../images/home-cover1.jpg";
import pic4 from "../images/home-cover2.jpg";
import profilePic from "../images/barber_profile_pic.png";

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

const mockBarbers = [
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
        name: "Billy Barber",
        description:
            "Barbers cut and style men’s hair. They may also provide other grooming services, such as shaving, beard trimming or hair treatments. Most barbers work in fairly small barbers' shops which serve customers in their local areas.",
        picture: profilePic,
        timeslot: 30,
        specialties: ["Haircut", "Shaving"],
    },
    {
        id: "125",
        name: "Billy Barber",
        description:
            "Barbers cut and style men’s hair. They may also provide other grooming services, such as shaving, beard trimming or hair treatments. Most barbers work in fairly small barbers' shops which serve customers in their local areas.",
        picture: profilePic,
        timeslot: 30,
        specialties: ["Haircut", "Shaving"],
    },
    {
        id: "126",
        name: "Billy Barber",
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
