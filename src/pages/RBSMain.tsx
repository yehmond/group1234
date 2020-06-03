import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import RBSForm, {
    RBSFormState,
} from "../components/RegisterBarbershop/RBSForm";
import RBSHours, {
    RBSHoursState,
} from "../components/RegisterBarbershop/RBSHours";
import { Barbershop, initializeBarbershop } from "../types/barbershop";
import RBSConfirm from "../components/RegisterBarbershop/RBSConfirm";

interface RBSMainState {
    barbershop: Barbershop;
}

class RBSMain extends Component<{}, RBSMainState> {
    constructor(props: any) {
        super(props);
        this.state = { barbershop: initializeBarbershop() };
        this.addFormParameters = this.addFormParameters.bind(this);
        this.addHoursParameters = this.addHoursParameters.bind(this);
    }

    public addFormParameters(state: RBSFormState): void {
        this.setState(
            { barbershop: Object.assign({}, this.state.barbershop, state)});
    }

    public addHoursParameters(state: RBSHoursState): void {
        this.setState(
            { barbershop: Object.assign({}, this.state.barbershop, state) });
    }

    render() {
        return (
            <Switch>
                <Route path="/createshop/register">
                    <RBSForm nextPage={this.addFormParameters} barbershop={this.state.barbershop} />
                </Route>
                <Route path="/createshop/hours">
                    <RBSHours barbershop={this.state.barbershop} nextPage={this.addHoursParameters} />
                </Route>
                <Route path="/createshop/confirm">
                    <RBSConfirm barbershop={this.state.barbershop} />
                </Route>
            </Switch>
        );
    }
}

export default RBSMain;
