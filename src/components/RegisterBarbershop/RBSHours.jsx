import React, { Component } from "react";
import StepperHeader from "../Stepper/StepperHeader";
import { ADD_BARBERSHOP_STEPS, DAYS_OF_WEEK } from "../../utils/constants";
import "../FormFields/Forms.scss";
import DayHoursInput from "./DayHoursInput";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class RBSHours extends Component {
    constructor(props) {
        super(props);
        this.state = { hours: this.props.barbershop.hours };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.nextPage(this.state);
    }

    render() {
        return (
            <div>
                <StepperHeader currentStep={1} stepLabels={ADD_BARBERSHOP_STEPS} />
                <div className="page-content">
                    <h1>Hours of Operation</h1>
                    <form className="hours-fields">
                        {DAYS_OF_WEEK.map((day, index) => {
                            return (
                                <DayHoursInput
                                    day={this.state.hours[index]}
                                    dayOfWeek={day}
                                    key={day}
                                    label={"Closed"}
                                />
                            );
                        })}
                        <div className="inline-buttons long">
                            <div className="divider"></div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                component={Link}
                                to={"/createshop/register"}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                component={Link}
                                to={"/createshop/confirm"}
                                onClick={this.handleSubmit}
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RBSHours;
