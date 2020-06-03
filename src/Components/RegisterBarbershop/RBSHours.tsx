import React, { Component } from "react";
import StepperHeader from "../Stepper/StepperHeader";
import { ADD_BARBERSHOP_STEPS, DAYS_OF_WEEK } from "../../types/constants";
import "./RBS.scss";
import DayHoursInput from "../FormFields/DayHoursInput";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Day, initializeHours } from "../../types/barbershop";

export interface RBSHoursState {
    hours: Day[];
}

interface RBSHoursProps {
    nextPage: (state: RBSHoursState) => void;
}

class RBSHours extends Component<RBSHoursProps, RBSHoursState> {
    constructor(props: any) {
        super(props);
        this.state = { hours: initializeHours() };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(): void {
        this.props.nextPage(this.state);
    }

    render() {
        return (
            <div>
                <StepperHeader
                    currentStep={1}
                    stepLabels={ADD_BARBERSHOP_STEPS}
                />
                <div className="rbs-page-content">
                    <h1>Hours of Operation</h1>
                    <form className="hours-fields">
                        {DAYS_OF_WEEK.map((day, index) => {
                            return (
                                <DayHoursInput
                                    day={this.state.hours[index]}
                                    dayOfWeek={day}
                                    key={day}
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
                                to={"/createshop/confirm"}
                                onClick={this.handleSubmit}
                            >
                                Next
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RBSHours;
