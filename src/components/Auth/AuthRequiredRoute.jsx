import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRequiredRoute({ children, ...rest }) {
    const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn === true ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
