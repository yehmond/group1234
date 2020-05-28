import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";

function App(): JSX.Element {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/browse"></Route>
                <Route path="/about"></Route>
                <Route path="/signin"></Route>
                <Route path="/signup"></Route>
            </Switch>
        </Router>
    );
}

export default App;
