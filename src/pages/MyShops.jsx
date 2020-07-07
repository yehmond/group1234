import React from "react";
import ShopsList from "../components/MyShops/ShopsList";
import { Route, Switch } from "react-router-dom";
import AddBarber from "../components/MyShops/AddBarber/AddBarber";
import ViewSchedule from "../components/MyShops/ViewSchedule/ViewSchedule";
import ViewShop from "../components/MyShops/ViewShop/ViewShop";
import Stats from "./Stats";
import { useSelector } from "react-redux";
import UserContext from "./UserContext";

export default function MyShops() {
    const authState = useSelector((state) => state.authState);
    return (
        <UserContext.Provider value={authState.userId}>
        <Switch>
            <Route exact path="/stores">
                <ShopsList />
            </Route>
            <Route path="/stores/:storeID/addbarber">
                <AddBarber />
            </Route>
            <Route path="/stores/:storeID/schedule">
                <ViewSchedule />
            </Route>
            <Route path="/stores/:storeID/stats">
                <Stats />
            </Route>
            <Route eaxct path="/stores/:storeID">
                <ViewShop />
            </Route>
        </Switch>
        </UserContext.Provider>
    );
}
