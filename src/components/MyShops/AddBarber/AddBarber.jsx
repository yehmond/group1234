import React, { Component } from "react";
import {
    RenderAutocomplete,
    RenderDropzone,
    RenderSelect,
    RenderTextfield,
} from "../../FormFields/FormFields";
import { Button } from "@material-ui/core";
import '../../FormFields/Forms.scss';
import { DAYS_OF_WEEK, SERVICES_OFFERED, TIMESLOT_VALUES } from "../../../utils/constants";
import DayHoursInput from "../../RegisterBarbershop/DayHoursInput";
import { initializeHours } from "../../../utils/utils";

class AddBarber extends Component {

    constructor(props) {
        super(props);
        this.state = {hours: initializeHours()};
    }

    render() {
        return (
            <div className="page-content">
                <h1> Add Barber</h1>
                <form>
                <div className="form-fields">
                    <div className="two-fields-inline">
                    <RenderTextfield
                        name="firstName"
                        required={true}
                        label="First Name"
                        placeholder="First Name"
                        fieldWidth="small"
                    />
                    <RenderTextfield
                        name="lastName"
                        required={true}
                        label="Last Name"
                        placeholder="Last Name"
                        fieldWidth="small"
                    />
                    </div>
                    <RenderTextfield
                        name="profile"
                        required={true}
                        label="Profile"
                        placeholder="Write a quick profile for your barber"
                        fieldWidth="regular"
                        multiline={true}
                    />
                    <div className="two-fields-inline long">
                        <RenderAutocomplete
                            label="specialities"
                            placeholder="Specialty Services"
                            options = {SERVICES_OFFERED}
                            fieldWidth="medium"
                        />
                        <RenderSelect
                            name="timeslotValue"
                            required={true}
                            label="Timeslot"
                            options={TIMESLOT_VALUES}
                            fieldWidth="extra-small"
                        />
                    </div>
                    <div className="field-regular">
                        <RenderDropzone
                            name="photos"
                            label="Upload a Profile Picture"
                        />
                    </div>
                </div>

                    <h1>Weekly Schedule</h1>
                    <div className="hours-fields">
                        {DAYS_OF_WEEK.map((day, index) => {
                            return (
                                <DayHoursInput
                                    day={this.state.hours[index]}
                                    dayOfWeek={day}
                                    key={day}
                                    label={"Day off"}
                                />
                            );
                        })}
                    </div>
                    <div className="one-button">
                        <div className="divider"></div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                        >
                            Add Barber
                        </Button>
                    </div>
                </form>
    </div>
        );
    }
}

export default AddBarber;
