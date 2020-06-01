import { Chip, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { DropzoneArea } from "material-ui-dropzone";

/**
 * This file contains functional presentational components that can be reused across forms
 */

// interface for relevant fieldProps passed to the functional components
interface FieldProps {
    // for all field
    label?: string;
    placeholder?: string;
    fieldWidth?: string;
    required?: boolean;
    id?: string;
    disabled?: boolean;
    // for select dropdowns
    options?: string[];
    // for textfield
    multiline?: boolean;
    // for time picker
    defaultValue?: string;
}

// function component to render a textfield
export function RenderTextfield(props: FieldProps): JSX.Element {
    return (
        <TextField
            label={props.label}
            required={props.required}
            placeholder={props.placeholder}
            multiline={props.multiline}
            rows={4}
            // error={}
            // helperText={}
            className={"field-" + props.fieldWidth}
        />
    );
}

// function component to render a select
export function RenderSelect(props: FieldProps): JSX.Element {
    return (
        <TextField
            label={props.label}
            placeholder={props.placeholder}
            select
            required={props.required}
            id={props.id}
            // error={}
            // helperText={}
            className={"field-" + props.fieldWidth}
        >
            {props.options &&
                props.options.map((option) => {
                    return (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    );
                })}
        </TextField>
    );
}

// function component to render an autocomplete
export function RenderAutocomplete(props: FieldProps): JSX.Element {
    return (
        <Autocomplete
            multiple
            id={props.id}
            freeSolo
            options={props.options as string[]}
            className={"field-" + props.fieldWidth}
            renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Services"
                    placeholder="Add Another"
                />
            )}
        />
    );
}

export function RenderTimePicker(props: FieldProps): JSX.Element {
    return (
        <TextField
            label={props.label}
            type="time"
            defaultValue={props.defaultValue}
            required
            disabled={props.disabled}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                step: 1800, // 5 min
            }}
        />
    );
}

export function RenderDropzone(): JSX.Element {
    return (
        <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Drag and drop an image here or click"}
        />
    );
}

