import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import RBSFormRegister from "../components/RegisterBarbershop/RBSFormRegister";
import { RBProps } from "../components/RegisterBarbershop/RBSContainer";
import RBSHours from "../components/RegisterBarbershop/RBSHours";

class RBSMain extends Component<{}, RBProps> {
    render() {
        return (
                <Switch>
                    <Route path="/createshop/register">
                        <RBSFormRegister />
                    </Route>
                    <Route path="/createshop/hours">
                        <RBSHours/>
                    </Route>
                    <Route path="/createshop/confirm"></Route>
                </Switch>
        );
    }
}

export default RBSMain;
