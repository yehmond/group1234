import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import RBSMain from "./pages/RBSMain";
import NavBar from "./components/NavBar";
import "./App.scss";
import Home from "./pages/Home";
import MyReservations from "./pages/MyReservations";
import Reservation from "./pages/Reservation";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App(): JSX.Element {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/browse"></Route>
                <Route path="/about"></Route>
                <Route path="/signin"></Route>
                <Route path="/signup"></Route>
                <Route path="/reservations">
                    <MyReservations />
                </Route>
                <Route path="/reservation">
                    <Reservation />
                </Route>
                <Route path="/signin">
                    <SignInPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <Route path="/createshop">
                    <Redirect to="/createshop/register" />
                    <RBSMain />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
