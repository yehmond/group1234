import React, { Component } from "react";
import "./ViewShops.scss";
import { Tab, Tabs } from "@material-ui/core";
import Info from "./Info";
import Chip from "@material-ui/core/Chip";
import Reviews from "./Reviews";
import Barbers from "./Barbers";
import { withRouter } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { getStore } from "../../../api/customer";
import ErrorText from "../../Dialog/Error";

class ViewShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "INFO_PAGE",
            storeId: props.match.params.storeID,
            barbershop: props.location.shop,
            error: false,
        };
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        // for a refresh, need to fetch
        if (!this.props.location.shop) {
            getStore(this.state.storeId).then((response) => {
                let fetchedShop = null;
                // will only be one store
                if (response !== null) {
                    const store = response.store;
                    const barbers = response.barbers;
                    const reservations = response.reservations;
                    const reviews = response.reviews;
                    fetchedShop = {
                        id: response.store_id,
                        name: store.name,
                        address: store.address,
                        lat: parseFloat(store.lat),
                        lon: parseFloat(store.lon),
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
                        owner: store.owner_id,
                    };
                    this.setState({ barbershop: fetchedShop });
                } else {
                    // this store doesn't exist (should not be possible)
                    this.setState({ error: true });
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
        if (this.state.error)
            return <ErrorText message={"There has been an error! Sorry!"} />;
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
                                shopOwnerID={this.state.barbershop.owner}
                            />
                        )}
                        {this.state.page === "REVIEWS_PAGE" && (
                            <Reviews
                                reviews={this.state.barbershop.reviews}
                                barbers={this.state.barbershop.barbers}
                            />
                        )}
                    </div>
                )}
            </>
        );
    }
}

export default withRouter(ViewShop);
