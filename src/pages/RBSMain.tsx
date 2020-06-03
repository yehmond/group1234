import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import RBSForm from "../components/RegisterBarbershop/RBSForm";
import RBSHours from "../components/RegisterBarbershop/RBSHours";
import { Barbershop, initializeBarbershop } from "../types/barbershop";

interface RBSMainState {
    barbershop: Barbershop;
}

class RBSMain extends Component<{},RBSMainState> {

    constructor(props: any) {
        super(props);
        this.state ={barbershop: initializeBarbershop()};
    }

    render() {
        return (
            <Switch>
                <Route path="/createshop/register">
                    <RBSForm bs = {this.state.barbershop} />
                </Route>
                <Route path="/createshop/hours">
                    <RBSHours />
                </Route>
                <Route path="/createshop/confirm"></Route>
            </Switch>
        );
    }
}

export default RBSMain;
