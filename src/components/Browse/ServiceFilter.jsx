import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { setService } from "../../actions/filterActions";
import { SERVICES_OFFERED } from "../../utils/constants";

export default function ServiceFilter() {
    const dispatch = useDispatch();
    const [serviceState, setServiceState] = React.useState(
        Object.fromEntries(SERVICES_OFFERED.map((service) => [service, false]))
    );

    const handleChange = (event) => {
        const newServiceState = {
            ...serviceState,
            [event.target.name]: event.target.checked,
        };
        setServiceState(newServiceState);
        dispatch(setService(newServiceState));
    };

    return (
        <div>
            <FormControl component="fieldset">
                <Typography gutterBottom>Services Offered</Typography>
                <FormGroup>
                    {SERVICES_OFFERED.map((service) => {
                        return (
                            <FormControlLabel
                                key={service}
                                control={
                                    <Checkbox
                                        checked={serviceState[service]}
                                        onChange={handleChange}
                                        name={service}
                                    />
                                }
                                label={service}
                            />
                        );
                    })}
                </FormGroup>
            </FormControl>
        </div>
    );
}
