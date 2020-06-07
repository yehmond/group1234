import React, { useState } from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { TextField, Button, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import moment from "moment";

const DEFAULT_SEARCH_TEXT = "Vancouver";
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "7px",
        width: "fit-content",
        maxWidth: "1080px",
        margin: "0 auto",
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: "7px",
        padding: "0.5rem 0.25rem",
        margin: "auto 0.25rem",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginBottom: "1rem",
        },
    },
    input: {
        margin: "0.25rem",
        height: "3.25rem",
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 0.5rem)",
        },
    },
    location: {
        minWidth: "15rem",
    },
}));

export default function SearchBar() {
    const [selectedDate, setDateChange] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedLocation, setSelectedLocation] = useState(DEFAULT_SEARCH_TEXT);
    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        const [date, time, location] = getEncodedDateTimeLocation();
        history.push(`/search?date=${date}&time=${time}&location=${location}`);
    }

    function getEncodedDateTimeLocation() {
        const parsedData = {
            date: moment(selectedDate).format("YYYY-MM-DD"),
            time: moment(selectedTime).format("HH:mm"),
            location: selectedLocation,
        };
        return Object.keys(parsedData).map((key) =>
            encodeURIComponent(parsedData[key])
        );
    }

    return (
        <div className={classes.container}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.pickerContainer}>
                    <KeyboardDatePicker
                        className={`${classes.input}`}
                        disableToolbar
                        disablePast
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date"
                        format="DD/MM/YYYY"
                        value={selectedDate}
                        onChange={(date) => setDateChange(date)}
                    />
                </div>
                <div className={classes.pickerContainer}>
                    {/* <KeyboardTimePicker
                        className={`${classes.input}`}
                        disableToolbar
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Time"
                        value={selectedTime}
                        onChange={setSelectedTime}
                    /> */}
                    <KeyboardTimePicker
                        className={`${classes.input}`}
                        disableToolbar
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Time"
                        mask="__:__ _M"
                        value={selectedDate}
                        onChange={setSelectedTime}
                    />
                </div>

                <div className={classes.pickerContainer}>
                    <Autocomplete
                        className={clsx(classes.input, classes.location)}
                        autoHighlight
                        freeSolo
                        value={selectedLocation}
                        defaultValue={DEFAULT_SEARCH_TEXT}
                        options={[
                            "🍕 Pizza",
                            "🍪 Cookie",
                            "🍩 Doughnut",
                            "🍫 Chocolate",
                        ]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Location or Shop Name"
                                variant="outlined"
                            ></TextField>
                        )}
                        onChange={(event, value) => {
                            setSelectedLocation(value);
                        }}
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.input}
                    onClick={handleClick}
                >
                    Search
                </Button>
            </MuiPickersUtilsProvider>
        </div>
    );
}
