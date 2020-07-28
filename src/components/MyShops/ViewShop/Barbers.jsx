import React, { Component } from "react";
import "./ViewShops.scss";
import BarberCard from "./Cards/BarberCard";
import Typography from "@material-ui/core/Typography";

class Barbers extends Component {
    render() {
        console.log(this.props);
        if (!this.props.barbers || this.props.barbers.length === 0) {
            return (
                <Typography align="center" variant={"h2"}>
                    There are no barbers yet!
                </Typography>
            );
        } else {
            return (
                <div id="barbers-wrapper">
                    {this.props.barbers.map((barber, index) => {
                        return (
                            <BarberCard
                                key={index}
                                barber={barber}
                                shopID={this.props.shopID}
                                shopOwnerID={this.props.shopOwnerID}
                            />
                        );
                    })}
                </div>
            );
        }
    }
}

export default Barbers;
