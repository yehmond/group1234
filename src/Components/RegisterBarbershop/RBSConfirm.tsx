import React, { PureComponent } from "react";
import ExpandMore from "@material-ui/icons/ArrowDropDownCircle";
import ExpandLess from "@material-ui/icons/ArrowDropUp";
import { Barbershop, Day } from "../../types/barbershop";
import StepperHeader from "../Stepper/StepperHeader";
import { ADD_BARBERSHOP_STEPS, DAYS_OF_WEEK } from "../../types/constants";
import "./RBS.scss";
import SummaryRenderer from "../SummaryRenderer/SummaryRenderer";
import _ from "lodash";
import { convert24HrTo12Hr } from "../../types/utils";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

interface RBSConfirmProps {
    barbershop: Barbershop;
}

interface RBSConfirmState {
    clonedBS: any;
    isHoursDisp: boolean;
}

class RBSConfirm extends PureComponent<RBSConfirmProps, RBSConfirmState> {
    constructor(props: RBSConfirmProps) {
        super(props);
        this.state = {
            clonedBS: _.omit(this.props.barbershop, [
                "id",
                "photos",
                "hours",
                "price",
                "description",
            ]),
            isHoursDisp: false,
        };
        this.handleClickDisplayHours = this.handleClickDisplayHours.bind(this);
    }

    public handleClickDisplayHours(): void {
        const prevState = this.state.isHoursDisp;
        this.setState({ isHoursDisp: !prevState });
    }

    public transformHours(day: Day): string {
        return day.isOpen
            ? convert24HrTo12Hr(day.from) + " to " + convert24HrTo12Hr(day.to)
            : "Closed";
    }

    render() {
        return (
            <div>
                <StepperHeader currentStep={2} stepLabels={ADD_BARBERSHOP_STEPS} />
                <div className="rbs-page-content">
                    <h1>Summary</h1>
                    <p id="confirm-subtitle">
                        Please confirm that the fields below are accurate; please go
                        back if necessary.
                    </p>
                    {Object.keys(this.state.clonedBS).map((key) => {
                        return (
                            <SummaryRenderer
                                indented={false}
                                key={key}
                                displayKey={_.startCase(key)}
                                value={this.state.clonedBS[key]}
                            />
                        );
                    })}
                    <div className="dropdown-container">
                        <div>
                            <h2 className="header-and-icon">Hours</h2>
                            {!this.state.isHoursDisp && (
                                <ExpandMore
                                    className="header-and-icon"
                                    id="drop-icon"
                                    onClick={this.handleClickDisplayHours}
                                />
                            )}
                            {this.state.isHoursDisp && (
                                <ExpandLess
                                    className="header-and-icon"
                                    id="drop-icon"
                                    onClick={this.handleClickDisplayHours}
                                />
                            )}
                        </div>
                        {this.state.isHoursDisp &&
                            this.props.barbershop.hours.map((day, index) => {
                                return (
                                    <SummaryRenderer
                                        indented={true}
                                        displayKey={DAYS_OF_WEEK[index]}
                                        value={this.transformHours(day)}
                                        key={index}
                                    />
                                );
                            })}
                    </div>
                    <div className="inline-buttons">
                        <div className="divider"></div>

                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            component={Link}
                            to={"/createshop/hours"}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            component={Link}
                            to={"/createshop/hours"}
                            // onClick={this.handleSubmit}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RBSConfirm;
