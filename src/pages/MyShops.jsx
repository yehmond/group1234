import React from "react";
import ShopsList from "../components/MyShops/ShopsList";
import { Route, Switch } from "react-router-dom";
import AddBarber from "../components/MyShops/AddBarber/AddBarber";
import ViewSchedule from "../components/MyShops/ViewSchedule/ViewSchedule";
import ViewShop from "../components/MyShops/ViewShop/ViewShop";
import Stats from "./Stats";
import { useSelector } from "react-redux";
import UserContext from "./UserContext";
import Typography from "@material-ui/core/Typography";

export default function MyShops() {
    const authState = useSelector((state) => state.authState);
    if (authState.role === "OWNER") {
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
                    <Route exact path="/stores/:storeID">
                        <ViewShop />
                    </Route>
                </Switch>
            </UserContext.Provider>
        );
    } else {
        return (
            <Typography
                align="center"
                variant={"h2"}
                style={{ "padding": "100px" }}
            >
                You are not authorized to view this page
            </Typography>
        );
    }
}
