import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    pickerContainer: {
        width: "100%",
    },
}));

function getDateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");
    if (date) {
        return date;
    }
    return null;
}

export default function DateFilter() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [selectedDate, setDateChange] = useState(new Date());

    useEffect(() => {
        const date = getDateFromUrl();
        if (date) {
            setDateChange(date);
        }
    }, [location]);

    function handleChange(date) {
        if (moment(date).isValid()) {
            setDateChange(date);
            setQueryString(
                { date: moment(date).format("YYYY-MM-DD") },
                history,
                true
            );
        }
    }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className={classes.pickerContainer}>
                <KeyboardDatePicker
                    disableToolbar
                    disablePast
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    format="DD/MM/YYYY"
                    value={selectedDate}
                    onChange={handleChange}
                    fullWidth={true}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
}
