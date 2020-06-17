import React, { Component } from "react";
import CarouselWrapper from "./CarouselWrapper/CarouselWrapper";
import "./ViewShops.scss";
import InfoCard from "./Cards/InfoCard";
import { hoursToString } from "../../../utils/utils";
import MapCard from "./Cards/MapCard";

class Info extends Component {
    barbershop = null;

    constructor(props) {
        super(props);
        this.barbershop = props.barbershop;
        this.state = { page: "INFO_PAGE" };
    }

    getAddressCard() {
        const loc = this.barbershop.city + ", " + this.barbershop.province;
        return {
            address: this.barbershop.address,
            location: loc,
            phoneNumber: this.barbershop.phoneNumber,
            website: this.barbershop.website,
        };
    }

    render() {
        const loc = { lat: this.barbershop.lat, lon: this.barbershop.lon };
        return (
            <div id="shop-info-content">
                <div>
                    <CarouselWrapper images={this.barbershop.photos} />
                </div>
                <div id="shop-information">
                    <InfoCard title={"Information"} info={this.getAddressCard()} />
                    <InfoCard
                        title={"Hours"}
                        info={hoursToString(this.barbershop.hours)}
                    />
                    <MapCard title={"Location"} loc={loc} />
                </div>
            </div>
        );
    }
}

export default Info;
