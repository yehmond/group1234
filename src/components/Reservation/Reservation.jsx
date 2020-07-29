import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getStore, registerReservation } from "../../api/customer";
import { useLocation, useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";
import { RenderSelect, RenderTimePicker } from "../FormFields/FormFields";
import '../FormFields/Fields.scss';
import { getEarliestAndLatest, isShopOpen } from "../../utils/utils";
import DatePicker from "react-datepicker";

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
    const location = useLocation();
    const store_id = location.pathname.split('reserve/')[1];
    const user_id = window.localStorage.getItem('id');
    const [store, setStore] = useState(null);
    // barber id
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [services, setServices] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [minTime, setMinTime] = useState(null);
    const [maxTime, setMaxTime] = useState(null);

    const handleBarberChange = (event) => {
        setSelectedBarber(event.target.value);
        if(event.target.value === 'Any') {
            setServices(store.store.services);
            setMinTime(getEarliestAndLatest(store.store.hours)[0]);
            setMaxTime(getEarliestAndLatest(store.store.hours)[1]);
        } else {
            console.log('here');
            const barber = store.barbers.find(barber => barber.barber_id === event.target.value);
            const servicesByBarber = barber.services.map(obj => obj.service);
            setServices(servicesByBarber);
            setMinTime(getEarliestAndLatest(barber.hours)[0]);
            setMaxTime(getEarliestAndLatest(barber.hours)[1]);
        }
    }

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    }

    const handleChangeDate = (event) => {
        setSelectedDate(event.target.value);
    }

    const handleChangeTime = (event) => {
        setSelectedTime(event.target.value);
    }

    const isOpen = (date) => {
        let parsed = new Date(date);
        if(selectedBarber === 'Any') {
            return isShopOpen(parsed, store.store.hours);

        } else {
            const barber = store.barbers.find(barber => barber.barber_id === selectedBarber);
            console.log(barber);
            return isShopOpen(parsed, barber.schedule);
        }
    };

    useEffect(() => {
        getStore(store_id).then((res) => {
            res.barbers.unshift({
                name: 'Any',
                barber_id: 'Any'
            });
            setStore(res);
        });
    }, []);

    if(!store)
        return <Loading/>;
    else {
        return (
            <div>
                <div>
                    <h1>Make Your Reservation With {store.store.name}!</h1>
                </div>

                <div className="two-fields-inline">
                    <RenderSelect
                        name="Barber"
                        required={true}
                        label="Select Barber"
                        options={store.barbers.map((barber) => {  return {name: barber.name, value: barber.barber_id}})}
                        handleChange={handleBarberChange}
                        fieldWidth="medium"
                    />
                    <RenderSelect
                        name="Service"
                        required={true}
                        label="Select Service"
                        options={services}
                        fieldWidth="medium"
                        disabled={!selectedBarber}
                        handleChange={handleServiceChange}
                    />
                </div>
                <div className="two-fields-inline">
                    <DatePicker
                        selected={new Date()}
                        disabled={!selectedBarber || !selectedService}
                        minDate={new Date()}
                        onChange={date => setSelectedDate(date)}
                        filterDate={isOpen}
                        placeholderText="Select a weekday"
                    />
                    <RenderTimePicker
                        disabled={!selectedBarber || !selectedService}
                        handleChange={handleChangeTime}
                        name="Time"
                        required={true}
                        fieldWidth="medium"
                        label="Select Time"
                    />
                </div>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Check Avalibatility
                    </Button>
                </div>
            </div>
        );
    }
}
