import React, { useState, ChangeEvent } from "react";
import {
    MuiPickersUtilsProvider,
    DatePicker,
    TimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { TextField, Button, makeStyles, Theme } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";

type DateType = Date | MaterialUiPickersDate;
const DEFAULT_SEARCH_TEXT = "Vancouver";
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "5px",
        width: "fit-content",
        maxWidth: "1080px",
        margin: "0 auto",
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderRadius: "5px",
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

export default function SearchBar(): JSX.Element {
    const [selectedDate, setDateChange] = useState<DateType>(new Date());
    const [selectedTime, setSelectedTime] = useState<DateType>(new Date());
    const [selectedText, setSelectedText] = useState<string | null>(
        DEFAULT_SEARCH_TEXT
    );
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.pickerContainer}>
                    <DatePicker
                        className={`${classes.input}`}
                        disableToolbar
                        disablePast
                        variant="inline"
                        inputVariant="outlined"
                        label="Date"
                        format="MMM Do, yyyy"
                        value={selectedDate}
                        onChange={(date) => setDateChange(date)}
                    />
                </div>
                <div className={classes.pickerContainer}>
                    <TimePicker
                        className={`${classes.input}`}
                        disableToolbar
                        ampm={true}
                        variant="inline"
                        inputVariant="outlined"
                        label="Time"
                        value={selectedTime}
                        onChange={setSelectedTime}
                    />
                </div>

                <div className={classes.pickerContainer}>
                    <Autocomplete
                        className={clsx(classes.input, classes.location)}
                        autoHighlight
                        freeSolo
                        value={selectedText}
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
                        onChange={(
                            event: ChangeEvent<unknown>,
                            value: string | null
                        ) => {
                            setSelectedText(value);
                        }}
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.input}
                >
                    Search
                </Button>
            </MuiPickersUtilsProvider>
        </div>
    );
}
