import React from "react";
import Recommendations from "../components/Recommendations";
import Jumbotron from "../components/Jumbotron";

export default function Home(): JSX.Element {
    return (
        <>
            <Jumbotron />
            <Recommendations />
        </>
    );
}
