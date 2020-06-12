import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function ServiceFilter() {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Services</FormLabel>
            <RadioGroup
                aria-label="services"
                name="services"
                // value={value}
                // onChange={handleChange}
            >
                <FormControlLabel value="Hair" control={<Radio />} label="Hair" />
                <FormControlLabel value="Nails" control={<Radio />} label="Nails" />
                <FormControlLabel value="Spa" control={<Radio />} label="Spa" />
            </RadioGroup>
        </FormControl>
    );
}
