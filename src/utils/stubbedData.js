import { initializeHours } from "./utils";
import pic1 from "../images/barbershop.png";
import pic2 from "../images/home-cover.jpg";
import pic3 from "../images/home-cover1.jpg";
import pic4 from "../images/home-cover2.jpg";

const imageList = [
    pic1, pic2, pic3, pic4
];


export const mockStore = {
    id: "123",
    name: "Billy's Barbershop",
    address: "123 Main Street",
    city: "Vancouver",
    province: "BC",
    website:"www.billysbarbershop.com",
    phoneNumber: "(604) 123-4567",
    description: "A great barbershop lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    servicesOffered: [
        "Haircut",
        "Shaving",
        "Hair color",
        "Eyebrows",
        "Nails",
    ],
    price: 4,
    photos: imageList,
    hours: initializeHours()
};
