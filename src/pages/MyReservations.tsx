import React from "react";
// import "./CSS/myReservationCSS.css";
import PassReservations from "./../components/PassReservations";
import CurrentReservation from "./../components/CurrentReservation";

export default function MyReservations(): JSX.Element {
 

    return (
        <div id="wrapper">

            <h1>My Reservations</h1>

            <CurrentReservation/>
            <PassReservations/>

        </div>
    );
}
