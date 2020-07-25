import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { SERVICES_OFFERED } from "../../utils/constants";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { registerReservation } from "../../api/customer";
import { getStores } from "../../api/owner";
import { validateEmail } from "../../utils/utils";

const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            margin: "3rem",
            padding: "3rem",
            alignItems: "center",
            textAlign: "center",
        },
        formControl: {
            minWidth: 120,
            marginTop: "2rem",
            marginBottom: "0.5rem",
        },
        container: {
            display: "block",
            padding: "1rem",
            minHeight: "8rem",
            alignItems: "center",
            textAlign: "center",
            paddingRight: "3rem",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        schedule: {
            margin: "5rem",
            textAlign: "center",
            backgroundColor: "rgb(239, 235, 242)",
            padding: "3rem",
        },
        textInput: {
            paddingRight: "3rem",
            marginTop: "2rem",
        },
        serviceSelection: {
            paddingBottom: "2rem",
        },
        confwrapper: {
            margin: "5rem",
            paddingLeft: "5rem",
            paddingRight: "5rem",
            paddingBottom: "5rem",
            alignItems: "center",
            textAlign: "center",
        },
        header: {
            fontFamily: "Palatino",
        },
        hLine: {
            marginTop: "2.5rem",
        },
        textwrapper: {
            paddingTop: "2rem",
            paddingLeft: "20rem",
            paddingRight: "20rem",
            alignItems: "center",
        },
        text: {
            padding: theme.spacing(2),
            flexDirection: "column",
            textAlign: "left",
        },
        box: {
            paddingBottom: "2rem",
        },
    })
);

export default function Reservation() {
    const classes = useStyles();

    const [state, setState] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        emailError: false,
        emailHelper: "",
        store_name: "",

        user_id: 2, // TODO: remove hard-coded ID
        store_id: parseInt(Object.values(useParams())),
        barber_id: 0,
        start_time: "",
        service: "",
    });

    const [serviceState, setServiceState] = React.useState(
        Object.fromEntries(SERVICES_OFFERED.map((service) => [service, false]))
    );

    const [barber_id, setBarber] = React.useState("");
    const [submit, setSubmit] = useState(false);

    function handleBarberChange(event) {
        setBarber(event.target.value);
        setState({ ...state, barber_id: event.target.value });
    }

    function handleServiceChange(event) {
        const newServiceState = {
            ...serviceState,
            [event.target.name]: event.target.checked,
        };
        if (event.target.checked) {
            setState({ ...state, service: event.target.name });
        }
        setServiceState(newServiceState);
    }

    function handleChange(event) {
        const {
            target: { name, value },
        } = event;
        setState({ ...state, [name]: value });
    }

    function getStoreName() {
        getStores({ store_id: state.store_id }).then((res) => {
            setState({ ...state, store_name: res[0]["store"]["name"] });
        });
    }

    function submitReservation() {
        if (!validateEmail(state.email)) {
            setState({
                ...state,
                emailError: true,
                emailHelper: "Pleas enter a valid email",
            });
        } else {
            setSubmit(true);
        }
    }

    // TODO: getBarbers(body)

    useEffect(() => {
        getStoreName();
        if (submit) {
            console.log(
                "SUBMITTED reservation!",
                state.user_id,
                state.store_id,
                state.barber_id,
                state.start_time,
                state.service
            );
            registerReservation(
                state.user_id,
                state.store_id,
                state.barber_id,
                state.start_time,
                state.service
            )
                .then(() => {
                    // TODO: remove hard-coded ID
                    window.location = "/reservations/" + 65 + "/confirm";
                })
                .catch(() => {
                    console.log("register reservation error");
                });
        }
    }, [submit]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.reserveHeader}>
                <h1>Make Your Reservation With {state.store_name}!</h1>
            </div>

            <div className={classes.container}>
                <FormControl id="name" className={classes.textInput}>
                    <InputLabel htmlFor="customer_name">Full Name</InputLabel>
                    <Input name="fullName" onChange={handleChange} />
                </FormControl>
                <FormControl id="phone" className={classes.textInput}>
                    <InputLabel htmlFor="customer_phone">Phone Number</InputLabel>
                    <Input name="phoneNumber" onChange={handleChange} />
                </FormControl>
                <FormControl id="email" className={classes.textInput}>
                    <InputLabel htmlFor="customer_email">
                        Email Address *
                    </InputLabel>
                    <Input name="email" onChange={handleChange} required />
                </FormControl>
            </div>

            <div className={classes.container}>
                <form noValidate>
                    <TextField
                        name="start_time"
                        id="datetime-local"
                        label="Available Time Slot"
                        type="datetime-local"
                        defaultValue="2020-06-06T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                    />
                </form>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Barber</InputLabel>
                    <Select
                        name="barber"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={barber_id}
                        onChange={handleBarberChange}
                    >
                        {/* TODO: loop to show list of barbers */}
                        <MenuItem value={11}>Larry David</MenuItem>
                        <MenuItem value={12}>Jerry Seinfeld</MenuItem>
                        <MenuItem value={13}>J.B. Smoove</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className={classes.serviceSelection}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">
                        Select the service(s) for this booking
                    </FormLabel>
                    <FormGroup>
                        {SERVICES_OFFERED.map((service) => {
                            return (
                                <FormControlLabel
                                    key={service}
                                    control={
                                        <Checkbox
                                            checked={serviceState[service]}
                                            onChange={handleServiceChange}
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

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitReservation}
                >
                    Reserve
                </Button>
            </div>

            {/* <div className={classes.schedule}> */}
            {/* TODO: show schedule */}
            {/* <h1>Schedule Used to Reserve</h1> */}
            {/* </div> */}
        </div>
    );
}
