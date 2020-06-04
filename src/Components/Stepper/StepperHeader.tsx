import React, { Component } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import "./styles.scss";
import { LineConnector, StepIcon } from "./StepIcon";

interface StepperProps {
    currentStep: number;
    stepLabels: string[];
}

class StepperHeader extends Component<StepperProps, {}> {
    render() {
        return (
            <div className="stepper-container">
                <Stepper
                    activeStep={this.props.currentStep}
                    alternativeLabel
                    connector={<LineConnector />}
                >
                    {this.props.stepLabels.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={StepIcon}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }
}

export default StepperHeader;
