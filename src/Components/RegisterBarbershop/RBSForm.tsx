import {
    RenderAutocomplete,
    RenderDropzone,
    RenderRating,
    RenderSelect,
    RenderTextfield,
} from "../FormFields/FormFields";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import {
    ADD_BARBERSHOP_STEPS,
    PROVINCES,
    SERVICES_OFFERED,
} from "../../types/constants";
import "./RBS.scss";
import "../FormFields/Fields.scss";
import { Link } from "react-router-dom";
import StepperHeader from "../Stepper/StepperHeader";

interface RBSFormProps {
    nextPage: (state: RBSFormState) => void;
}

export interface RBSFormState {
    // relevant field for this barbershop
    name: string;
    address: string;
    city: string;
    price: number;
    province: string;
    phoneNumber: string;
    website: string;
    servicesOffered: string[];
    photos: File[];
}

class RBSForm extends Component<RBSFormProps, RBSFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            address: "",
            city: "",
            name: "",
            photos: [],
            province: "",
            servicesOffered: [],
            website: "",
            phoneNumber: "",
            price: 0,
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(
            this
        );
        this.handleDropZoneChange = this.handleDropZoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleTextChange(event: React.BaseSyntheticEvent): void {
        const {
            target: { name, value },
        } = event;
        this.setState({ [name]: value } as Pick<
            RBSFormState,
            keyof RBSFormState
        >);
    }

    public handleAutoCompleteChange(
        event: React.ChangeEvent,
        values: string[]
    ): void {
        this.setState({ servicesOffered: values } as Pick<
            RBSFormState,
            keyof RBSFormState
        >);
    }

    public handleDropZoneChange(files: File[]): void {
        this.setState({ photos: files });
    }

    public handleSubmit(): void {
        this.props.nextPage(this.state);
    }

    render() {
        return (
            <div>
                <StepperHeader
                    currentStep={0}
                    stepLabels={ADD_BARBERSHOP_STEPS}
                />
                <div className="rbs-page-content">
                    <h1>Add Barbershop</h1>
                    <form>
                        <div className="form-fields">
                            <RenderTextfield
                                name="name"
                                required={true}
                                label="Barbershop Name"
                                placeholder="Name of Barbershop"
                                fieldWidth="regular"
                                handleChange={this.handleTextChange}
                            />
                            <RenderTextfield
                                name="address"
                                required={true}
                                label="Street Address"
                                placeholder="Street Address"
                                fieldWidth="regular"
                                handleChange={this.handleTextChange}
                            />
                            <div className="two-fields-inline">
                                <RenderTextfield
                                    name="city"
                                    required={true}
                                    label="City"
                                    placeholder="City"
                                    fieldWidth="small"
                                    handleChange={this.handleTextChange}
                                />
                                <RenderSelect
                                    name="province"
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
                                    required={true}
                                    label="Website"
                                    placeholder="website"
                                    fieldWidth="small"
                                    handleChange={this.handleTextChange}
                                />

                                <RenderTextfield
                                    name="phoneNumber"
                                    required={true}
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    fieldWidth="small"
                                    handleChange={this.handleTextChange}
                                />
                            </div>

                            <RenderAutocomplete
                                id="servicesOffered"
                                label="Services Offered"
                                fieldWidth="regular"
                                placeholder="Services Offered"
                                options={SERVICES_OFFERED}
                                handleChange={this.handleAutoCompleteChange}
                            />
                            <RenderTextfield
                                name="description"
                                required={true}
                                label="Description"
                                placeholder="Write an enticing description"
                                fieldWidth="regular"
                                multiline={true}
                                handleChange={this.handleTextChange}
                            />
                            <RenderRating
                                label="Price Level"
                                name="price"
                                handleChange={this.handleTextChange}
                            />
                            <div className="field-regular">
                                <RenderDropzone
                                    name="photos"
                                    label="Upload Some Photos"
                                    handleChange={this.handleDropZoneChange}
                                />
                            </div>
                        </div>
                        <div className="inline-buttons">
                            <div className="divider"></div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                component={Link}
                                to={"/createshop/hours"}
                                onClick={this.handleSubmit}
                            >
                                Next
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RBSForm;
