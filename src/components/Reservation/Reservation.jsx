import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { SERVICES_OFFERED } from "../../utils/constants";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { registerReservation } from "../../api/customer";
import { getStores } from "../../api/owner";

const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            margin: "3rem",
            padding: "3rem",
            alignItems: "center",
            textAlign: "center",
        },
        formControl: {
            minWidth: 250,
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
        store_name: "",

        user_id: 2, // TODO / Given: remove hard-coded ID
        store_id: parseInt(Object.values(useParams())),
        barber_id: 0,
        start_time: "",
        service: "",
    });

    const [barber_id, setBarber] = React.useState("");
    const [submit, setSubmit] = useState(false);
    const [checkAvailbility, setCheckAvailbility] = useState(false);

    function handleCheckAvailbility() {
        setCheckAvailbility(true);
    }

    function handleBarberChange(event) {
        setBarber(event.target.value);
        setState({ ...state, barber_id: event.target.value });
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
        setSubmit(true);
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
            ).catch(() => {
                console.log("register reservation error");
            });
        }
    }, [submit]);

    if (!submit && !checkAvailbility) {
        return (
            <div className={classes.wrapper}>
                <div className={classes.reserveHeader}>
                    <h1>Make Your Reservation With {state.store_name}!</h1>
                </div>

                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-barber">
                            Please select a barber
                        </InputLabel>
                        <Select
                            name="barber"
                            labelId="select-barber"
                            id="selected-barber"
                            value={barber_id}
                            onChange={handleBarberChange}
                        >
                            <MenuItem value={-1}>Any</MenuItem>
                            <MenuItem value={11}>Larry David</MenuItem>
                            <MenuItem value={12}>Jerry Seinfeld</MenuItem>
                            <MenuItem value={13}>J.B. Smoove</MenuItem>
                        </Select>
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
                </div>

                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-service">
                            Please select a service
                        </InputLabel>
                        <Select
                            name="service"
                            labelId="select-service"
                            id="selected-service"
                            value={state.service}
                            onChange={handleChange}
                        >
                            {SERVICES_OFFERED.map((service) => {
                                return (
                                    <MenuItem value={service} key={service}>
                                        {service}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckAvailbility}
                    >
                        Check Avalibatility
                    </Button>
                </div>
            </div>
        );
    } else if (!submit && checkAvailbility) {
        // TODO: render a transition?
        return (
            <div className={classes.wrapper}>
                <div className={classes.reserveHeader}>
                    <h1>Make Your Reservation With {state.store_name}!</h1>
                </div>

                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-barber">
                            Please select a barber
                        </InputLabel>
                        <Select
                            name="barber"
                            labelId="select-barber"
                            id="selected-barber"
                            value={barber_id}
                            onChange={handleBarberChange}
                        >
                            <MenuItem value={-1}>Any</MenuItem>
                            <MenuItem value={11}>Larry David</MenuItem>
                            <MenuItem value={12}>Jerry Seinfeld</MenuItem>
                            <MenuItem value={13}>J.B. Smoove</MenuItem>
                        </Select>
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
                </div>

                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-service">
                            Please select a service
                        </InputLabel>
                        <Select
                            name="service"
                            labelId="select-service"
                            id="selected-service"
                            value={state.service}
                            onChange={handleChange}
                        >
                            {SERVICES_OFFERED.map((service) => {
                                return (
                                    <MenuItem value={service} key={service}>
                                        {service}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitReservation}
                        value={730}
                    >
                        7:30pm
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitReservation}
                        value={750}
                    >
                        7:50pm
                    </Button>
                </div>
            </div>
        );
    } else if (submit) {
        return (
            <div className={classes.wrapper}>
                <div>
                    <h1 className={classes.header}>
                        Thank you for booking with us!
                    </h1>
                </div>
                <Divider className={classes.hLine} variant="middle" />
                <div className={classes.textwrapper}>
                    <div className={classes.text}>
                        <Box
                            className={classes.box}
                            display="block"
                            displayPrint="none"
                        >
                            User Name: {state.user_name}
                        </Box>
                        <Box
                            className={classes.box}
                            display="block"
                            displayPrint="none"
                        >
                            Barbershop Name: {state.store_name}
                        </Box>
                        <Box
                            className={classes.box}
                            display="block"
                            displayPrint="none"
                        >
                            Barber: {state.barber_name}
                        </Box>
                        <Box
                            className={classes.box}
                            display="block"
                            displayPrint="none"
                        >
                            Start Time: {state.start_time}
                        </Box>
                        <Box
                            className={classes.box}
                            display="block"
                            displayPrint="none"
                        >
                            Service: {state.service}
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
}
