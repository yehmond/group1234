import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import RegisterBarbershopContainer from "./components/RegisterBarbershop/RegisterBarbershopContainer";

function App(): JSX.Element {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/"></Route>
                <Route path="/browse"></Route>
                <Route path="/about"></Route>
                <Route path="/signin"></Route>
                <Route path="/signup"></Route>
                <Route path="/createshop">
                    <RegisterBarbershopContainer currentStep={0} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
