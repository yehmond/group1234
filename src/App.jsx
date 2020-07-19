import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import RBSMain from "./pages/RBSMain";
import NavBar from "./components/Nav/NavBar";
import "./App.scss";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MyReservations from "./pages/MyReservations";
import Reservation from "./pages/Reservation";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MyShops from "./pages/MyShops";
import Rating from "./pages/Rating";
import ViewShop from "./components/MyShops/ViewShop/ViewShop";

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/browse">
                    <Browse />
                </Route>
                <Route path="/about"></Route>
                <Route path="/signin">
                    <SignInPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <Route exact path="/reserve/:id">
                    <Reservation />
                </Route>
                <Route exact path="/reservations">
                    <MyReservations />
                </Route>
                <Route path="/reservations/:reservationID/rate">
                    <Rating />
                </Route>
                <Route path="/createshop">
                    <Redirect to="/createshop/register" />
                    <RBSMain />
                </Route>
                <Route path="/stores">
                    <MyShops />
                </Route>
                <Route exact path="/view/stores/:storeID">
                    <ViewShop />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
