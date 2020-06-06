import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { Switch, Route } from "react-router-dom";
import RBSForm from "../components/RegisterBarbershop/RBSForm";
import RBSHours from "../components/RegisterBarbershop/RBSHours";
import RBSConfirm from "../components/RegisterBarbershop/RBSConfirm";

class RBSMain extends Component {
    constructor(props) {
        super(props);
        this.state = { barbershop: this.initializeBarbershop() };
        this.addFormParameters = this.addFormParameters.bind(this);
        this.addHoursParameters = this.addHoursParameters.bind(this);
    }

    initializeBarbershop() {
        return {
            id: uuidv4(),
            name: "",
            address: "",
            city: "",
            province: "",
            website: "",
            phoneNumber: "",
            description: "",
            hours: this.initializeHours(),
            price: 0,
            photos: [],
            servicesOffered: [],
        };
    }

    initializeHours() {
        const hours = [];
        for (let i = 0; i < 7; i++) {
            hours.push({ isOpen: true, from: "08:00", to: "17:00" });
        }
        return hours;
    }

    addFormParameters(state) {
        this.setState({
            barbershop: Object.assign({}, this.state.barbershop, state),
        });
    }

    addHoursParameters(state) {
        this.setState({
            barbershop: Object.assign({}, this.state.barbershop, state),
        });
    }

    render() {
        return (
            <Switch>
                <Route path="/createshop/register">
                    <RBSForm
                        nextPage={this.addFormParameters}
                        barbershop={this.state.barbershop}
                    />
                </Route>
                <Route path="/createshop/hours">
                    <RBSHours
                        barbershop={this.state.barbershop}
                        nextPage={this.addHoursParameters}
                    />
                </Route>
                <Route path="/createshop/confirm">
                    <RBSConfirm barbershop={this.state.barbershop} />
                </Route>
            </Switch>
        );
    }
}

export default RBSMain;
