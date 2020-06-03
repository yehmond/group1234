import React, { Component } from "react";
import "./Fields.scss";
import { RenderTimePicker } from "./FormFields";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Day } from "../../types/barbershop";
import { DEFAULT_FROM, DEFAULT_TO } from "../../types/constants";

interface FormTimeFieldsProps {
    dayOfWeek: string;
    day: Day;
}

interface FormTimeFieldState {
    isOpen: boolean;
}

class DayHoursInput extends Component<FormTimeFieldsProps, FormTimeFieldState> {
    constructor(props: FormTimeFieldsProps) {
        super(props);
        this.state = { isOpen: true };
        this.props.day.isOpen = this.state.isOpen;
        this.props.day.from = DEFAULT_FROM;
        this.props.day.to = DEFAULT_TO;
        this.toggleClosed = this.toggleClosed.bind(this);
        this.handleChangeClose = this.handleChangeClose.bind(this);
        this.handleChangeOpen = this.handleChangeOpen.bind(this);
    }

    public toggleClosed(): void {
        let prevChecked = this.state.isOpen;
        this.setState({ isOpen: !prevChecked });
        this.props.day.isOpen = !prevChecked;
        if (prevChecked) {
            this.props.day.from = "";
            this.props.day.to = "";
        }
    }

    public handleChangeOpen(event: React.BaseSyntheticEvent): void {
        this.props.day.from = event.target.value;
    }

    public handleChangeClose(event: React.BaseSyntheticEvent): void {
        this.props.day.to = event.target.value;
        console.log(this.props.day);
    }

    render() {
        return (
            <div className="time-input-container">
                <h2>{this.props.dayOfWeek}</h2>
                <RenderTimePicker
                    disabled={!this.state.isOpen}
                    defaultValue={DEFAULT_FROM}
                    handleChange={this.handleChangeOpen}
                />
                <p>To</p>
                <RenderTimePicker
                    disabled={!this.state.isOpen}
                    handleChange={this.handleChangeClose}
                    defaultValue={DEFAULT_TO}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={this.toggleClosed}
                            name="checkedB"
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
