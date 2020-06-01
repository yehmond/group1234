import React, { Component } from "react";
import StepperHeader from "../Stepper/StepperHeader";
import { ADD_BARBERSHOP_STEPS, DAYS_OF_WEEK } from "../../types/constants";
import './RBS.scss';
import DayHoursInput from "../FormFields/DayHoursInput";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class RBSHours extends Component {
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
                            {DAYS_OF_WEEK.map(day => {
                                return <DayHoursInput dayOfWeek={day}/>
                            })}
                            <div className="inline-buttons long">
                                <div className="divider"></div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    component={Link}
                                    to={"/createshop/confirm"}
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