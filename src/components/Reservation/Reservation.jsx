import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getAvailability, getStore } from "../../api/customer";
import { useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import { RenderSelect } from "../FormFields/FormFields";
import { getEarliestAndLatest, isShopOpen } from "../../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import BarberAvailability from "./BarberAvailability";

const useStyles = makeStyles((theme) =>
    createStyles({
        pageContainer: {
            display: "grid",
            justifyItems: "center",
            margin: "3rem",
            // eslint-disable-next-line
            ["@media (max-width:1000px)"]: {
                margin: "0.5rem"
            },
        },
        paper: {
            width: "100%",
            display: "grid",
            maxWidth: "900px",
            gridRowGap: "30px",
        },
        wrapper: {
            padding: "2rem",
            display: "grid",
            gridRowGap: "2vh",
            textAlign: "center",
        },
        title: {
            maxWidth: "100%",
        },
        twoFields: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridColumnGap: "50px",
            // eslint-disable-next-line
            ["@media (max-width:1000px)"]: {
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr 1fr",
                gridColumnGap: "0px",
                gridRowGap: "2vh"
            },

        },
        buttonContainer: {
            display: "grid",
            placeItems: "center",
        },
        button: {
            maxWidth: "250px",
        },
    })
);

export default function Reservation() {
    const classes = useStyles();
    const location = useLocation();
    const store_id = location.pathname.split("reserve/")[1];
    const user_id = window.localStorage.getItem("id");
    const [store, setStore] = useState(null);
    // barber object
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [services, setServices] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [minTime, setMinTime] = useState(null);
    const [maxTime, setMaxTime] = useState(null);
    const [results, setResults] = useState(null);
    const defaultDate = new Date();
    defaultDate.setHours(10, 0, 0, 0);

    const handleBarberChange = (event) => {
        const barber = store.barbers.find(
            (barber) => barber.barber_id === event.target.value
        );
        setSelectedBarber(barber);
        if (event.target.value === "Any") {
            setServices(store.store.services);
            setMinTime(getEarliestAndLatest(store.store.hours)[0]);
            setMaxTime(getEarliestAndLatest(store.store.hours)[1]);
        } else {
            const servicesByBarber = barber.services.map((obj) => obj.service);
            setServices(servicesByBarber);
            setMinTime(getEarliestAndLatest(barber.schedule)[0]);
            setMaxTime(getEarliestAndLatest(barber.schedule)[1]);
        }
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const isFormValid = () => {
        return (
            !selectedBarber || !selectedService || !selectedDate || !selectedTime
        );
    };

    const isOpen = (date) => {
        let parsed = new Date(date);
        if (selectedBarber.barber_id === "Any") {
            return isShopOpen(parsed.getDay(), store.store.hours);
        } else {
            return isShopOpen(parsed.getDay(), selectedBarber.schedule);
        }
    };

    const checkAvailability = () => {
        if (selectedBarber.barber_id !== "Any")
            getAvailability(store_id, selectedDate, selectedService, {
                barber_id: selectedBarber.barber_id,
            }).then((response) => {
                if (response) {
                    console.log(response);
                    setResults(response);
                }
            });
        // Any barber
        else
            getAvailability(store_id, selectedDate, selectedService,{}).then(
                (response) => {
                    if (response) {
                        console.log(response);
                        setResults(response);
                    }
                }
            );
    };
    useEffect(() => {
        getStore(store_id).then((res) => {
            res.barbers.unshift({
                name: "Any",
                barber_id: "Any",
            });
            setStore(res);
        });
    }, [user_id, store_id]);

    if (!store) return <Loading />;
    else {
        return (
            <div className={classes.pageContainer} id="make-reservation-page">
                <div className={classes.paper}>
                    <Paper elevation={2}>
                        <div className={classes.wrapper} id="reserve-form">
                            <div className={classes.title}>
                                <h1>Make Your Reservation With</h1>
                                <h1>{store.store.name}!</h1>
                            </div>

                            <div className={classes.twoFields}>
                                <RenderSelect
                                    name="Barber"
                                    required={true}
                                    label="Select Barber"
                                    options={store.barbers.map((barber) => {
                                        return {
                                            name: barber.name,
                                            value: barber.barber_id,
                                        };
                                    })}
                                    handleChange={handleBarberChange}
                                />
                                <RenderSelect
                                    name="Service"
                                    required={true}
                                    label="Select Service"
                                    options={services}
                                    disabled={!selectedBarber}
                                    handleChange={handleServiceChange}
                                />
                            </div>
                            <div className={classes.twoFields}>
                                <div>
                                    <DatePicker
                                        selected={selectedDate}
                                        disabled={
                                            !selectedBarber || !selectedService
                                        }
                                        minDate={new Date()}
                                        dateFormat="MMMM d, yyyy"
                                        onChange={(date) => setSelectedDate(date)}
                                        filterDate={isOpen}
                                        customInput={<TextField label="Select a Date" />}
                                        placeholderText={"Select a date"}
                                    />
                                </div>
                                <div>
                                    <DatePicker
                                        selected={selectedTime}
                                        disabled={
                                            !selectedBarber || !selectedService
                                        }
                                        onChange={(time) => setSelectedTime(time)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        minTime={minTime}
                                        maxTime={maxTime}
                                        customInput={<TextField label="Select a Time"/>}
                                        placeholderText={"Select a time"}
                                    />
                                </div>
                            </div>
                            <div className={classes.buttonContainer}>
                                <p>
                                    Please select a time and we will find the
                                    nearest available time slots
                                </p>
                                <br />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    disabled={isFormValid()}
                                    onClick={() => {
                                        checkAvailability();
                                    }}
                                >
                                    Check Availability
                                </Button>
                            </div>
                        </div>
                    </Paper>
                    {results && (
                        <div id="results-reserve">
                            {results.map((result, index) => {
                                return (
                                    <BarberAvailability
                                        key={index}
                                        barber={result}
                                        service={selectedService}
                                        storeID={store_id}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
