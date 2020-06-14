import React from "react";
import ShopsList from "../components/MyShops/ShopsList";
import { Route, Switch } from "react-router-dom";
import AddBarber from "../components/MyShops/AddBarber/AddBarber";
import ViewSchedule from "../components/MyShops/ViewSchedule/ViewSchedule";
import ViewShop from "../components/MyShops/ViewShop";

export default function MyShops() {
    return (
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
            <Route path="/stores/:storeID/stats"></Route>
            <Route path="/stores/:storeID/view">
                <ViewShop />
            </Route>
        </Switch>
    );
}
