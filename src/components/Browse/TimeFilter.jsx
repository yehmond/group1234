import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { setQueryString } from "../../utils/utils";
import { useLocation, useHistory } from "react-router-dom";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
const useStyles = makeStyles(() => ({
    pickerContainer: {
        width: "100%",
    },
}));

function getTimeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const time = params.get("time");
    if (time) {
        return moment(decodeURIComponent(time), "HH:mm");
    }
    return null;
}

export default function TimeFilter() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [selectedTime, setSelectedTime] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState();

    useEffect(() => {
        const time = getTimeFromUrl();
        if (time) {
            setSelectedTime(time);
        } else {
            setSelectedTime(null);
        }
    }, [location]);

    function handleChange(time) {
        if (time === null) {
            setSelectedTime(null);
            setQueryString({ time: "" }, history, true);
            return;
        }
        clearTimeout(typingTimeout);
        setTypingTimeout(
            setTimeout(() => {
                if (time && time.isValid()) {
                    setQueryString(
                        { time: moment(time).format("HH:mm") },
                        history,
                        true
                    );
                }
            }, 700)
        );
        setSelectedTime(moment(time));
    }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className={classes.pickerContainer}>
                <KeyboardTimePicker
                    className={classes.input}
                    variant="dialogue"
                    clearable
                    inputVariant="outlined"
                    mask="__:__ _M"
                    fullWidth={true}
                    keyboardIcon={<ScheduleRoundedIcon />}
                    value={selectedTime}
                    onChange={handleChange}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
}
