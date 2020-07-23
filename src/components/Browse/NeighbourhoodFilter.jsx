import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { parseSearchURL, setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";
import { getNeighbourhoods } from "../../api/customer";

export default function NeighbourhoodFilter() {
    const location = useLocation();
    const history = useHistory();
    const [neighbourhoods, setNeighbourhood] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const { neighbourhoods } = parseSearchURL();
        if (neighbourhoods) {
            setNeighbourhood(neighbourhoods);
        }
    }, [location]);

    useEffect(() => {
        getNeighbourhoods("Vancouver", "BC", 10).then((data) => {
            if (data) {
                setOptions(data);
            }
        });
    }, []);

    function handleChange(event) {
        let newNeighbourhoodState = [];
        if (neighbourhoods.includes(event.target.name)) {
            newNeighbourhoodState = neighbourhoods.filter(
                (s) => s !== event.target.name
            );
        } else {
            newNeighbourhoodState = [...neighbourhoods, event.target.name];
        }
        setNeighbourhood(newNeighbourhoodState);
        setQueryString({ neighbourhoods: newNeighbourhoodState }, history, true);
    }

    return (
        <div>
            <FormControl component="fieldset">
                <Typography gutterBottom>Neighbourhoods</Typography>
                <FormGroup>
                    {options.slice(0, 20).map((neighbourhood) => {
                        return (
                            <FormControlLabel
                                key={neighbourhood}
                                control={
                                    <Checkbox
                                        checked={neighbourhoods.includes(
                                            neighbourhood
                                        )}
                                        onChange={handleChange}
                                        name={neighbourhood}
                                    />
                                }
                                label={neighbourhood}
                            />
                        );
                    })}
                </FormGroup>
            </FormControl>
        </div>
    );
}
