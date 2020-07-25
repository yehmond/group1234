import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRequiredRoute({ component: Component, ...rest }) {
    const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/signin" }} />
                )
            }
        />
    );
}
