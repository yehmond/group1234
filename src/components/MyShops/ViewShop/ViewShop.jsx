import React, { Component } from "react";
import "./ViewShops.scss";
import { Tab, Tabs } from "@material-ui/core";
import Info from "./Info";
import Chip from "@material-ui/core/Chip";
import Reviews from "./Reviews";
import Barbers from "./Barbers";
import { withRouter } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { getStore } from "../../../api/owner";

class ViewShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "INFO_PAGE",
            storeId: props.match.params.storeID,
            barbershop: props.location.shop,
        };
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        // for a refresh, need to fetch
        if (!this.props.location.shop) {
            getStore({ store_id: this.state.storeId }).then((response) => {
                const fetchedShops = [];
                // will only be one store
                if (response !== null) {
                    for (let obj of response) {
                        const store = obj.store;
                        const barbers = obj.barbers;
                        const reservations = obj.reservations;
                        const reviews = obj.reviews;
                        const fetchedShop = {
                            id: obj.store_id,
                            name: store.name,
                            address: store.address,
                            lat: parseInt(store.lat),
                            lon: parseInt(store.lon),
                            city: store.city,
                            province: store.province,
                            website: store.website,
                            phoneNumber: store.phone_number,
                            description: store.description,
                            servicesOffered: store.services,
                            price: store.price,
                            photos: store.pictures,
                            hours: store.hours,
                            reviews: reviews,
                            barbers: barbers,
                            reservations: reservations,
                        };
                        fetchedShops.push(fetchedShop);
                    }
                    this.setState({ barbershop: fetchedShops[0] });
                } else {
                    // this store doesn't exist (should not be possible
                }
            });
        }
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
                {!this.state.barbershop && <Loading />}
                {this.state.barbershop && (
                    <div id="shop-page-wrapper" className="page-content">
                        <div id="top-info">
                            <h1>{this.state.barbershop.name}</h1>
                            <p>{this.state.barbershop.description}</p>
                            <div id="service-tags">
                                {this.state.barbershop.servicesOffered.map(
                                    (service) => {
                                        return (
                                            <Chip
                                                label={service}
                                                color="primary"
                                                key={service}
                                            />
                                        );
                                    }
                                )}
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
                            <Barbers
                                barbers={this.state.barbershop.barbers}
                                shopID={this.state.barbershop.id}
                            />
                        )}
                        {this.state.page === "REVIEWS_PAGE" && (
                            <Reviews reviews={this.state.barbershop.reviews} />
                        )}
                    </div>
                )}
            </>
        );
    }
}

export default withRouter(ViewShop);
