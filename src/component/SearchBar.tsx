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

type DateType = Date | MaterialUiPickersDate;

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 0.5rem",
        borderRadius: "5px",
        width: "85%",
        maxWidth: "1080px",
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        backgroundColor: "rgba(0,0,0,0.85)",
    },
    pickerContainer: {
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        borderRadius: "5px",
        padding: "0.5rem 0.25rem",
        margin: "auto 0.25rem",
    },
    input: {
        margin: "0.25rem",
        height: "3.25rem",
        [theme.breakpoints.down("sm")]: {
            Width: "100%",
            marginTop: "1rem",
        },
    },
}));

export default function SearchBar(): JSX.Element {
    const DEFAULT_SEARCH_TEXT = "Vancouver";
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
                        className={`${classes.input}`}
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
                        style={{ width: 300 }}
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
