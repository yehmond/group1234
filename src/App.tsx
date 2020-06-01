import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import RBSContainer from "./components/RegisterBarbershop/RBSContainer";

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
                    <RBSContainer />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
