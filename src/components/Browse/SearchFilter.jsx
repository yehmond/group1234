import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { IconButton } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import { setQueryString } from "../../utils/utils";

function getSearchStringFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const string = params.get("string");
    if (string && string.length > 0) {
        return decodeURIComponent(string);
    }
    return null;
}

export default function SearchFilter() {
    const location = useLocation();
    const history = useHistory();
    const [string, setString] = useState("");

    useEffect(() => {
        const string = getSearchStringFromUrl();
        if (string) {
            setString(string);
        }
    }, [location]);

    function handleChange(event) {
        setString(event.target.value);
    }

    function handleClick() {
        setQueryString({ string: string }, history, true);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            setQueryString({ string: string }, history, true);
        }
    }

    return (
        <TextField
            label="Store name"
            variant="outlined"
            fullWidth={true}
            value={string}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClick}>
                            <SearchRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
