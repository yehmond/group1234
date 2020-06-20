import React, { Component } from "react";
import "./ViewShops.scss";
import { mockStore } from "../../../utils/stubbedData";
import { Tab, Tabs } from "@material-ui/core";
import Info from "./Info";
import Chip from "@material-ui/core/Chip";
import Reviews from "./Reviews";
import Barbers from "./Barbers";

class ViewShop extends Component {
    constructor(props) {
        super(props);
        this.barbershop = mockStore;
        this.state = { page: "INFO_PAGE" };
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(event, value) {
        this.setState({ page: value });
    }

    genDollarSigns() {
        let dollarSigns = "";
        for (let i = 0; i < this.barbershop.price; i++) {
            dollarSigns += "$";
        }
        return dollarSigns;
    }

    render() {
        return (
            <div id="shop-page-wrapper" className="page-content">
                <div id="top-info">
                    <h1>{this.barbershop.name}</h1>
                    <p>{this.barbershop.description}</p>
                    <div id="service-tags">
                        {this.barbershop.servicesOffered.map((service) => {
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
                    <Info barbershop={this.barbershop} />
                )}
                {this.state.page === "BARBER_PAGE" && (
                    <Barbers barbers={this.barbershop.barbers} />
                )}
                {this.state.page === "REVIEWS_PAGE" && (
                    <Reviews reviews={this.barbershop.reviews} />
                )}
            </div>
        );
    }
}

export default ViewShop;
