import React, { useState, useEffect } from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { TextField, Button, makeStyles } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { SERVICES_OFFERED } from "../../utils/constants";
import { getNeighbourhoods } from "../../api/customer";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        borderRadius: "7px",
        width: "fit-content",
        maxWidth: "1080px",
        margin: "0 auto",
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    innerContainer: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    datePicker: {
        width: "12rem",
    },
    timePicker: {
        width: "10.5rem",
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: "7px",
        padding: "0.5rem 0.25rem",
        margin: "0.75rem 0.25rem",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            margin: "0 0.25rem 1rem",
        },
    },
    input: {
        margin: "0.25rem",
        height: "3.25rem",
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 0.5rem)",
        },
    },
    services: {
        minWidth: "8.5rem",
    },
    neighbourhood: {
        minWidth: "10rem",
    },
    searchText: {
        minWidth: "12rem",
    },
}));

export default function SearchBar() {
    const [selectedDate, setDateChange] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new moment());
    const [selectedNeighbourhood, setSelectedNeighbourhood] = useState("Any");
    const [selectedService, setSelectedService] = useState("Any");
    const [neighbourhoodOptions, setNeighbourhoodOptions] = useState([]);
    const [string, setString] = useState("");

    const classes = useStyles();
    const history = useHistory();

    // Get locations and shop name
    useEffect(() => {
        getNeighbourhoods("Vancouver", "BC", 10).then((data) => {
            if (data) {
                setNeighbourhoodOptions(data.sort());
            }
        });
    }, []);

    function handleClick() {
        if (!hasValidInput()) {
            return;
        }
        let query = "/browse?";
        const filters = getEncodedFilters();
        for (const [key, value] of Object.entries(filters)) {
            if (value.length === 0) {
                continue;
            }
            if (query.slice(-8) !== "/browse?") {
                query += "&";
            }
            query += `${key}=${value}`;
        }

        history.push(query);
    }

    function hasValidInput() {
        if (!moment(selectedDate).isValid()) {
            alert("Please enter a valid date.");
            return false;
        }

        if (!moment(selectedTime).isValid()) {
            alert("Please enter a valid time.");
            return false;
        }

        if (
            !selectedService ||
            selectedService.length === 0 ||
            (selectedService !== "Any" &&
                !SERVICES_OFFERED.includes(selectedService))
        ) {
            alert("Please enter a valid service.");
            return false;
        }

        if (selectedNeighbourhood === null) {
            alert("Please enter a valid neighbourhood.");
            return false;
        }

        return true;
    }

    function getEncodedFilters() {
        const parsedData = {
            date: moment(selectedDate).format("YYYY-MM-DD"),
            time: moment(selectedTime).format("HH:mm"),
            services: selectedService === "Any" ? "" : selectedService,
            neighbourhood:
                selectedNeighbourhood === "Any" ? "" : selectedNeighbourhood,
            string: string,
        };

        for (const [key, value] of Object.entries(parsedData)) {
            parsedData[key] = encodeURIComponent(value);
        }

        return parsedData;
    }

    return (
        <div className={classes.container}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={clsx(classes.pickerContainer, classes.datePicker)}>
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
                        onChange={setDateChange}
                    />
                </div>
                <div className={clsx(classes.pickerContainer, classes.timePicker)}>
                    <KeyboardTimePicker
                        className={classes.input}
                        disableToolbar
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Time"
                        mask="__:__ _M"
                        keyboardIcon={<ScheduleIcon />}
                        value={selectedTime}
                        onChange={setSelectedTime}
                    />
                </div>

                <div className={classes.pickerContainer}>
                    <Autocomplete
                        className={clsx(classes.input, classes.services)}
                        autoHighlight
                        freeSolo
                        value={selectedService}
                        options={["Any", ...SERVICES_OFFERED]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Service"
                                variant="outlined"
                            ></TextField>
                        )}
                        onChange={(event, value) => {
                            setSelectedService(value);
                        }}
                    />
                </div>

                <div className={classes.pickerContainer}>
                    <Autocomplete
                        className={clsx(classes.input, classes.neighbourhood)}
                        autoHighlight
                        freeSolo
                        defaultValue="Any"
                        options={["Any", ...neighbourhoodOptions]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Neighbourhood"
                                variant="outlined"
                            ></TextField>
                        )}
                        onChange={(event, value) => {
                            setSelectedNeighbourhood(value);
                        }}
                    />
                </div>

                <div className={classes.pickerContainer}>
                    <TextField
                        className={classes.input}
                        label="Store name"
                        placeholder="Find by store name"
                        variant="outlined"
                        autoFocus
                        value={string}
                        onChange={(event) => {
                            setString(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleClick();
                            }
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
            <Button
                variant="contained"
                color="primary"
                className={clsx(classes.input, classes.search)}
                onClick={handleClick}
            >
                Search
            </Button>
        </div>
    );
}
