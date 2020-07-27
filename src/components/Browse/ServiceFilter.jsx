import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { SERVICES_OFFERED } from "../../utils/constants";
import { setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";

function getServicesFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const services = params.get("services");
    if (services) {
        return services.split(",");
    }
    return null;
}

export default function ServiceFilter() {
    const location = useLocation();
    const history = useHistory();
    const [serviceState, setServiceState] = useState([]);

    useEffect(() => {
        const services = getServicesFromUrl();
        if (services) {
            setServiceState(services);
        }
    }, [location]);

    function handleChange(event) {
        let newServiceState = [];
        if (serviceState.includes(event.target.name)) {
            newServiceState = serviceState.filter((s) => s !== event.target.name);
        } else {
            newServiceState = [...serviceState, event.target.name];
        }
        setServiceState(newServiceState);
        setQueryString({ services: newServiceState }, history, true);
    }

    return (
        <div>
            <FormControl>
                <FormGroup>
                    {SERVICES_OFFERED.map((service) => {
                        return (
                            <FormControlLabel
                                key={service}
                                control={
                                    <Checkbox
                                        checked={serviceState.includes(service)}
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
