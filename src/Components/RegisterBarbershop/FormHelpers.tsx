import { MenuItem, MenuProps, Select, TextField } from "@material-ui/core";
import React from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

// constants
export const PROVINCES = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

// reusable form components
interface FieldProps {
    // for all field
    label: string;
    placeholder?: string;
    fieldWidth?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
    // for select dropdowns
    id?: string;
    options?: string[];
    menuProps?: MenuProps;
}

export function renderTextField (props: FieldProps): JSX.Element {
    console.log(props);
    return (
    <TextField
        label = {props.label}
        placeholder = {props.placeholder}
        error = {props.meta.touched && props.meta.invalid}
        helperText={props.meta.touched && props.meta.error}
        className={'field-' + props.fieldWidth}
        {...props.input}
    >
    </TextField>
    );
}



export function renderSelect (props: FieldProps): JSX.Element {
    return (
        <TextField
            label = {props.label}
            placeholder = {props.placeholder}
            select
            id={props.id}
            error = {props.meta.touched && props.meta.error}
            className={'textfield-' + props.fieldWidth}
            {...props.input}
        >
            {props.options && props.options.map((option)=> {
            return (
                <MenuItem key={option}>{option}</MenuItem>
            )})
        }
        </TextField>
    );
}