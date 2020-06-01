import React, { Component } from "react";
import "./Fields.scss"
import { RenderTimePicker } from "./FormFields";
import { Checkbox, FormControlLabel } from "@material-ui/core";

interface FormTimeFieldsProps{
    dayOfWeek:string;
}

interface FormTimeFieldState {
    disabled: boolean;
}

class DayHoursInput extends Component<FormTimeFieldsProps, FormTimeFieldState> {

    constructor(props: FormTimeFieldsProps) {
        super(props);
        this.state = {disabled: false}
        this.handleChange= this.handleChange.bind(this);
    }

    public handleChange(){
        this.setState((state) => ({
            disabled: !state.disabled
        }));
    }

    render() {
        return (
            <div className="time-input-container">
                <h2>{this.props.dayOfWeek}</h2>
               <RenderTimePicker disabled={this.state.disabled}  defaultValue={"08:00"} />
                <p>To</p>
               <RenderTimePicker disabled={this.state.disabled}  defaultValue={"17:00"}/>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={this.handleChange}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Closed?"/>
               </div>
        );
    }
}

export default DayHoursInput;