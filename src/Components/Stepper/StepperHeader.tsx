import React, { Component } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import "./styles.scss";

interface StepperProps {
    currentStep: number;
    stepLabels: string[];
}

class StepperHeader extends Component<StepperProps, {}> {
    render() {
        return (
            <div className="stepper-container">
                <Stepper activeStep={this.props.currentStep} alternativeLabel>
                    {this.props.stepLabels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }
}

export default StepperHeader;
