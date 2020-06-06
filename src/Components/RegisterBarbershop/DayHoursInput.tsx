import React, { Component } from "react";
import "../FormFields/Fields.scss";
import { RenderTimePicker } from "../FormFields/FormFields";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Day } from "../../types/barbershop";
import { DEFAULT_FROM, DEFAULT_TO } from "../../utils/constants";

interface FormTimeFieldsProps {
    dayOfWeek: string;
    day: Day;
}

interface FormTimeFieldState {
    day: Day;
}

class DayHoursInput extends Component<FormTimeFieldsProps, FormTimeFieldState> {
    constructor(props: FormTimeFieldsProps) {
        super(props);
        this.state = { day: this.props.day };
        this.toggleClosed = this.toggleClosed.bind(this);
        this.handleChangeClose = this.handleChangeClose.bind(this);
        this.handleChangeOpen = this.handleChangeOpen.bind(this);
    }

    public toggleClosed(): void {
        const prevChecked = this.state.day.isOpen;
        this.setState({ day: { ...this.state.day, isOpen: !prevChecked } }, () => {
            if (prevChecked) {
                this.setState(
                    { day: { ...this.state.day, from: "", to: "" } },
                    this.bindStateToProps
                );
            } else {
                this.setState(
                    {
                        day: {
                            ...this.state.day,
                            from: DEFAULT_FROM,
                            to: DEFAULT_TO,
                        },
                    },
                    this.bindStateToProps
                );
            }
        });
    }

    public handleChangeOpen(event: React.BaseSyntheticEvent): void {
        this.setState(
            { day: { ...this.state.day, from: event.target.value } },
            this.bindStateToProps
        );
    }

    public handleChangeClose(event: React.BaseSyntheticEvent): void {
        this.setState(
            { day: { ...this.state.day, to: event.target.value } },
            this.bindStateToProps
        );
    }

    public bindStateToProps() {
        this.props.day.isOpen = this.state.day.isOpen;
        this.props.day.from = this.state.day.from;
        this.props.day.to = this.state.day.to;
    }

    render() {
        return (
            <div className="time-input-container">
                <h2>{this.props.dayOfWeek}</h2>
                <RenderTimePicker
                    disabled={!this.state.day.isOpen}
                    value={this.state.day.from}
                    handleChange={this.handleChangeOpen}
                />
                <p>To</p>
                <RenderTimePicker
                    disabled={!this.state.day.isOpen}
                    handleChange={this.handleChangeClose}
                    value={this.state.day.to}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={this.toggleClosed}
                            name="checkedB"
                            checked={!this.state.day.isOpen}
                            color="primary"
                        />
                    }
                    label="Closed?"
                />
            </div>
        );
    }
}

export default DayHoursInput;
