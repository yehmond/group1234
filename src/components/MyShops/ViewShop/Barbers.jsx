import React, { Component } from "react";
import "./ViewShops.scss";
import BarberCard from "./Cards/BarberCard";

class Barbers extends Component {
    render() {
        return (
            <div id="barbers-wrapper">
                {this.props.barbers.map((barber, index) => {
                    return <BarberCard key={index} barber={barber} />;
                })}
            </div>
        );
    }
}

export default Barbers;
