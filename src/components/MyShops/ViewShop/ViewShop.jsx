import React, { Component } from "react";
import CarouselWrapper from "./CarouselWrapper/CarouselWrapper";
import './ViewShops.scss';
import { mockStore } from "../../../utils/stubbedData";
import AddressCard from "./AddressCard";


class ViewShop extends Component {
    barbershop = null;

    constructor(props) {
        super(props);
        this.barbershop = mockStore;
    }
    render() {
        return (
            <div id="view-shops-content" className="page-content">
                <h1>{this.barbershop.name}</h1>
                <div>
                    <CarouselWrapper images={this.barbershop.photos}/>
                </div>
                <div id="shop-information">
                    <AddressCard barbershop={this.barbershop}>
                        Address Card
                    </AddressCard>
                    <div>
                        Basic Information
                    </div>
                    <div>
                        Google Maps API
                    </div>
                </div>
                <div id="shop-reviews">

                </div>
            </div>
        );
    }
}

export default ViewShop;
