import React, { Component } from "react";
import "./ViewShops.scss";
import { imageList, mockStore } from "../../../utils/stubbedData";
import { Tab, Tabs } from "@material-ui/core";
import Info from "./Info";
import Chip from "@material-ui/core/Chip";
import Reviews from "./Reviews";
import Barbers from "./Barbers";
import { withRouter } from "react-router-dom";
import {getStoreById} from '../../../api/owner.js';
import Loading from "../../Loading/Loading";
import { initializeHours } from "../../../utils/utils";

class ViewShop extends Component {
    constructor(props) {
        super(props);
        this.state = { page: "INFO_PAGE",  storeId: this.props.match.params.storeID, barbershop: null };
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        getStoreById(this.state.storeId).then((response) =>{
            const store = response.store;
            const fetchedShop = {
                id: store.id,
                name: store.name,
                address: store.address,
                lat: parseInt(store.lat),
                lon: parseInt(store.lon),
                city: store.city,
                province: store.province,
                website: store.website,
                phoneNumber: store.phoneNumber,
                description: store.description,
                servicesOffered: store.services,
                price: store.price,
                photos: imageList,
                hours: store.hours,
                reviews: response.reviews,
                barbers: store.barberIDs,
            }
            this.setState({barbershop: fetchedShop});
        });
    }

    handleTabChange(event, value) {
        this.setState({ page: value });
    }

    genDollarSigns() {
        let dollarSigns = "";
        for (let i = 0; i < this.state.barbershop.price; i++) {
            dollarSigns += "$";
        }
        return dollarSigns;
    }

    render() {
        return (
            <>
                {!this.state.barbershop && (
                    <Loading/>
                )}
                {this.state.barbershop && (


            <div id="shop-page-wrapper" className="page-content">
                <div id="top-info">
                    <h1>{this.state.barbershop.name}</h1>
                    <p>{this.state.barbershop.description}</p>
                    <div id="service-tags">
                        {this.state.barbershop.servicesOffered.map((service) => {
                            return (
                                <Chip
                                    label={service}
                                    color="primary"
                                    key={service}
                                />
                            );
                        })}
                        <Chip
                            variant={"outlined"}
                            color={"primary"}
                            label={this.genDollarSigns()}
                        />
                    </div>
                </div>
                <Tabs
                    value={this.state.page}
                    onChange={this.handleTabChange}
                    centered
                >
                    <Tab label="Information" value={"INFO_PAGE"} />
                    <Tab label="Barbers" value={"BARBER_PAGE"} />
                    <Tab label="Reviews" value={"REVIEWS_PAGE"} />
                </Tabs>
                {this.state.page === "INFO_PAGE" && (
                    <Info barbershop={this.state.barbershop} />
                )}
                {this.state.page === "BARBER_PAGE" && (
                    <Barbers barbers={this.state.barbershop.barbers} />
                )}
                {this.state.page === "REVIEWS_PAGE" && (
                    <Reviews reviews={this.state.barbershop.reviews} />
                )}
            </div> )}
                </>
        );
    }
}

export default withRouter(ViewShop);
