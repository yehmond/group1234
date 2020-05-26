import React, { useState, ChangeEvent } from "react";
import {
    MuiPickersUtilsProvider,
    DatePicker,
    TimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {
    TextField,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Autocomplete from "@material-ui/lab/Autocomplete";

type DateType = Date | MaterialUiPickersDate;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
            padding: "1rem",
            border: "1px solid #000",
            borderRadius: "5px",
            width: "80%",
            maxWidth: "1080px",
            margin: "0 auto",
        },
        input: {
            margin: "0.25rem",
            height: "3.25rem",
        },
    })
);

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
                <DatePicker
                    className={classes.input}
                    disableToolbar
                    disablePast
                    variant="inline"
                    inputVariant="outlined"
                    label="Date"
                    format="MMM Do, yyyy"
                    value={selectedDate}
                    onChange={(date) => setDateChange(date)}
                />
                <TimePicker
                    className={classes.input}
                    disableToolbar
                    ampm={true}
                    variant="inline"
                    inputVariant="outlined"
                    label="Time"
                    value={selectedTime}
                    onChange={setSelectedTime}
                />
                <Autocomplete
                    className={classes.input}
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
