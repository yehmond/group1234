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
import UserContext from "../../../pages/UserContext";
import { withRouter } from "react-router-dom";
import DialogMessage from "../../Dialog/Dialog";
import { registerBarber } from "../../../api/owner";

class AddBarber extends Component {
    static contextType = UserContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            firstName: "",
            lastName: "",
            profile: "",
            specialties: [],
            photo: null,
            timeslotValue: 0,
            hours: initializeHours(),
            storeId: this.props.match.params.storeID,
            submitSuccess: false,
            submitError: false,
        };
        this.isFormValid = this.isFormValid.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this);
        this.handleDropZoneChange = this.handleDropZoneChange.bind(this);
        this.handleDropZoneDelete = this.handleDropZoneDelete.bind(this);
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

    handleDropZoneDelete() {
        this.setState({ photo: null });
    }

    specialitiesToServices() {
        let ret = [];
        for (const service of this.state.specialties) {
            ret.push({ service: service, duration: this.state.timeslotValue });
        }
        return ret;
    }

    hoursToDate() {
        let newHrs = [];
        for (let day in this.state.hours) {
            if (!day.isOpen) {
                newHrs.push({ from: "0000", to: "0000" });
            } else {
                newHrs.push(day);
            }
        }
        return newHrs;
    }

    handleSubmit() {
        registerBarber(
            this.state.firstName + " " + this.state.lastName,
            this.state.profile,
            this.state.photo,
            this.specialitiesToServices(),
            [this.state.storeId],
            this.hoursToDate()
        )
            .then(() => {
                this.setState({ submitSuccess: true });
            })
            .catch(() => {
                this.setState({ submitError: true });
            });
    }

    isFormValid() {
        return (
            !_.some(
                _.omit(
                    this.state,
                    "photo",
                    "timeslotValue",
                    "submitSuccess",
                    "submitError"
                ),
                _.isEmpty
            ) && this.state.timeslotValue !== 0
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
                                handleDelete={this.handleDropZoneDelete}
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
                {this.state.submitSuccess && (
                    <DialogMessage
                        title={"Success!"}
                        link={"/stores"}
                        text={"The barber has been successfully registered!"}
                    />
                )}
                {this.state.submitError && (
                    <DialogMessage
                        title={"Error!"}
                        text={"The barber was not registered! Please try again."}
                        link={"/stores/"}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(AddBarber);
