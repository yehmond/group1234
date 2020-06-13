import {
    RenderAutocomplete,
    RenderDropzone,
    RenderRating,
    RenderSelect,
    RenderTextfield,
} from "./FormFields/FormFields";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import {
    ADD_BARBERSHOP_STEPS,
    PROVINCES,
    SERVICES_OFFERED,
} from "../../utils/constants";
import "./RBS.scss";
import "./FormFields/Fields.scss";
import { Link } from "react-router-dom";
import StepperHeader from "../Stepper/StepperHeader";
import _ from "lodash";

class RBSForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.barbershop.address,
            city: this.props.barbershop.city,
            name: this.props.barbershop.name,
            photos: this.props.barbershop.photos,
            province: this.props.barbershop.province,
            servicesOffered: this.props.barbershop.servicesOffered,
            website: this.props.barbershop.website,
            phoneNumber: this.props.barbershop.phoneNumber,
            price: this.props.barbershop.price,
            description: this.props.barbershop.description,
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this);
        this.handleDropZoneChange = this.handleDropZoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    handleTextChange(event) {
        const {
            target: { name, value },
        } = event;
        this.setState({ [name]: value });
    }

    handleAutoCompleteChange(event, values) {
        this.setState({ servicesOffered: values });
    }

    handleDropZoneChange(files) {
        this.setState({ photos: files });
    }

    handleSubmit() {
        this.props.nextPage(this.state);
    }

    isFormValid() {
        return _.some(_.omit(this.state, "photos"), _.isEmpty);
    }

    render() {
        return (
            <div>
                <StepperHeader currentStep={0} stepLabels={ADD_BARBERSHOP_STEPS} />
                <div className="rbs-page-content">
                    <h1>Add Barbershop</h1>
                    <form>
                        <div className="form-fields">
                            <RenderTextfield
                                name="name"
                                required={true}
                                label="Barbershop Name"
                                value={this.state.name}
                                placeholder="Name of Barbershop"
                                fieldWidth="regular"
                                handleChange={this.handleTextChange}
                            />
                            <RenderTextfield
                                name="address"
                                value={this.state.address}
                                required={true}
                                label="Street Address"
                                placeholder="Street Address"
                                fieldWidth="regular"
                                handleChange={this.handleTextChange}
                            />
                            <div className="two-fields-inline">
                                <RenderTextfield
                                    name="city"
                                    value={this.state.city}
                                    required={true}
                                    label="City"
                                    placeholder="City"
                                    fieldWidth="small"
                                    handleChange={this.handleTextChange}
                                />
                                <RenderSelect
                                    name="province"
                                    value={this.state.province}
                                    required={true}
                                    id="rbs-province-select"
                                    label="Province"
                                    placeholder="Province"
                                    fieldWidth="small"
                                    options={PROVINCES}
                                    handleChange={this.handleTextChange}
                                />
                            </div>
                            <div className="two-fields-inline">
                                <RenderTextfield
                                    name="website"
                                    value={this.state.website}
                                    required={true}
                                    label="Website"
                                    placeholder="website"
                                    fieldWidth="small"
                                    handleChange={this.handleTextChange}
                                />

                                <RenderTextfield
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    required={true}
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    fieldWidth="small"
                                    handleChange={this.handleTextChange}
                                />
                            </div>

                            <RenderAutocomplete
                                id="servicesOffered"
                                value={this.state.servicesOffered}
                                label="Services Offered"
                                fieldWidth="regular"
                                placeholder="Services Offered"
                                options={SERVICES_OFFERED}
                                handleChange={this.handleAutoCompleteChange}
                            />
                            <RenderTextfield
                                name="description"
                                required={true}
                                value={this.state.description}
                                label="Description"
                                placeholder="Write an enticing description"
                                fieldWidth="regular"
                                multiline={true}
                                handleChange={this.handleTextChange}
                            />
                            <RenderRating
                                label="Price Level"
                                name="price"
                                value={this.state.price}
                                handleChange={this.handleTextChange}
                            />
                            <div className="field-regular">
                                <RenderDropzone
                                    name="photos"
                                    label="Upload Some Photos"
                                    handleChange={this.handleDropZoneChange}
                                    value={this.state.photos.map((file) => {
                                        return file.type;
                                    })}
                                />
                            </div>
                        </div>
                        <div className="one-button">
                            <div className="divider"></div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                component={Link}
                                disabled={this.isFormValid()}
                                to={"/createshop/hours"}
                                onClick={this.handleSubmit}
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RBSForm;
