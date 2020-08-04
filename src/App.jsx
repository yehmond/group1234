import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import SignUpSuccessful from "./pages/SignUpSuccessful";
import AuthRequiredRoute from "./components/Auth/AuthRequiredRoute";
import { setSignInStatus } from "./actions/authActions";

function App() {
    // Initialize auth state
    const dispatch = useDispatch();
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");
    if (email && role && id) {
        dispatch(setSignInStatus(email, role, id));
    }

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
                <Route path="/signin">
                    <SignInPage />
                </Route>
                <Route exact path="/signup">
                    <SignUpPage />
                </Route>
                <Route exact path="/signup/success">
                    <SignUpSuccessful />
                </Route>
                <AuthRequiredRoute exact path="/reserve/:id">
                    <Reservation />
                </AuthRequiredRoute>
                <AuthRequiredRoute exact path="/reservations">
                    <MyReservations />
                </AuthRequiredRoute>
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
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
