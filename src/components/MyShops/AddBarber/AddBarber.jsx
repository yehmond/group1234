import React, { Component } from "react";
import {
    RenderAutocomplete,
    RenderDropzone,
    RenderSelect,
    RenderTextfield,
} from "../../FormFields/FormFields";
import { Button } from "@material-ui/core";
import "../../FormFields/Forms.scss";
import {
    DAYS_OF_WEEK,
    SERVICES_OFFERED,
    TIMESLOT_VALUES,
} from "../../../utils/constants";
import DayHoursInput from "../../RegisterBarbershop/DayHoursInput";
import { initializeHours } from "../../../utils/utils";
import _ from "lodash";

class AddBarber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            profile: "",
            specialties: [],
            photo: [],
            timeslotValue: 0,
            hours: initializeHours(),
        };
        this.isFormValid = this.isFormValid.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this);
        this.handleDropZoneChange = this.handleDropZoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        const {
            target: { name, value },
        } = event;
        this.setState({ [name]: value });
    }

    handleAutoCompleteChange(event, values) {
        this.setState({ specialties: values });
    }

    handleDropZoneChange(files) {
        this.setState({ photo: files });
    }

    handleSubmit() {
        // tbd
        console.log(this.state);
    }

    isFormValid() {
        return (
            !_.some(_.omit(this.state, "photo", "timeslotValue"), _.isEmpty) &&
            this.state.timeslotValue !== 0
        );
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
                                handleChange={this.handleTextChange}
                            />
                            <RenderTextfield
                                name="lastName"
                                required={true}
                                label="Last Name"
                                placeholder="Last Name"
                                fieldWidth="small"
                                handleChange={this.handleTextChange}
                            />
                        </div>
                        <RenderTextfield
                            name="profile"
                            required={true}
                            label="Profile"
                            placeholder="Write a quick profile for your barber"
                            fieldWidth="regular"
                            multiline={true}
                            handleChange={this.handleTextChange}
                        />
                        <div className="two-fields-inline long">
                            <RenderAutocomplete
                                label="specialities"
                                placeholder="Specialties"
                                options={SERVICES_OFFERED}
                                fieldWidth="medium"
                                handleChange={this.handleAutoCompleteChange}
                            />
                            <RenderSelect
                                name="timeslotValue"
                                required={true}
                                label="Timeslot"
                                options={TIMESLOT_VALUES}
                                fieldWidth="extra-small"
                                handleChange={this.handleTextChange}
                            />
                        </div>
                        <div className="field-regular">
                            <RenderDropzone
                                name="photos"
                                label="Upload a Profile Picture"
                                acceptedFiles={["image/*"]}
                                dropzoneText="Add a profile picture!"
                                filesLimit={1}
                                handleChange={this.handleDropZoneChange}
                            />
                        </div>
                    </div>
                    <br />
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
                            disabled={!this.isFormValid()}
                            onClick={this.handleSubmit}
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
