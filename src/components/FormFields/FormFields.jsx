import { Chip, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { Autocomplete, Rating } from "@material-ui/lab";
import { DropzoneArea } from "material-ui-dropzone";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

/**
 * This file contains functional presentational components that can be reused across forms
 */

// function component to render a textfield
export function RenderTextfield(props) {
    return (
        <TextField
            name={props.name}
            label={props.label}
            required={props.required}
            placeholder={props.placeholder}
            multiline={props.multiline}
            onChange={props.handleChange}
            rows={4}
            value={props.value}
            className={"field-" + props.fieldWidth}
        />
    );
}

// function component to render a select
export function RenderSelect(props) {
    return (
        <TextField
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            select
            required={props.required}
            onChange={props.handleChange}
            defaultValue={""}
            id={props.id}
            value={props.value}
            className={"field-" + props.fieldWidth}
            disabled={props.disabled || false}
        >
            {props.options &&
                props.options.map((option) => {
                    return (
                        <MenuItem
                            key={option.name || option}
                            value={option.value || option}
                        >
                            {option.name || option}
                        </MenuItem>
                    );
                })}
        </TextField>
    );
}

// function component to render an autocomplete
export function RenderAutocomplete(props) {
    return (
        <Autocomplete
            multiple
            id={props.id}
            options={props.options}
            onChange={props.handleChange}
            value={props.value}
            className={"field-" + props.fieldWidth}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option}
                        key={index}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.placeholder}
                    placeholder="Add Another"
                />
            )}
        />
    );
}

export function RenderTimePicker(props) {
    return (
        <TextField
            name={props.name}
            label={props.label}
            type="time"
            defaultValue={props.defaultValue}
            required
            value={props.value}
            onChange={props.handleChange}
            disabled={props.disabled}

            InputLabelProps={{
                shrink: true,

            }}
            inputProps={{
                step: 1800, // 30 min increment
            }}
        />
    );
}

export function RenderDropzone(props) {
    const onDropHandler = (files) => {
        const file = files[0];
        let newPic;
        const reader = new FileReader();
        reader.onload = (event) => {
            newPic = event.target.result;
            props.handleChange(newPic);
        };
        reader.readAsDataURL(file);
    };
    const onDeleteHandler = (files) => {
        const file = files;
        let oldPic;
        const reader = new FileReader();
        reader.onload = (event) => {
            oldPic = event.target.result;
            props.handleDelete(oldPic);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div>
            <h4>{props.label}</h4>
            <DropzoneArea
                acceptedFiles={props.acceptedFiles}
                dropzoneText={props.dropzoneText}
                initialFiles={props.value}
                filesLimit={props.filesLimit}
                onDrop={onDropHandler}
                onDelete={onDeleteHandler}
            />
        </div>
    );
}

export function RenderRating(props) {
    return (
        <div className="two-fields-inline rating-container">
            <p>Price Level</p>
            <Rating
                name={props.name}
                precision={1}
                onChange={props.handleChange}
                max={3}
                value={parseInt(props.value)}
                size="large"
                icon={<MonetizationOnIcon fontSize="inherit" />}
            />
        </div>
    );
}
