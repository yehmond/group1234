import React from "react";
import "./CSS/reservationCSS.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        container: {
            display: "flex",
            flexWrap: "wrap",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    })
);

export default function Reservation(): JSX.Element {
    const classes = useStyles();

    return (
        <div id="wrapper">
            {/* TODO: this.props.shopname */}
            <h1>Make Your Reservation With Tony&apos;s Barbershop!</h1>

            <div id="row">
                <FormControl id="name">
                    <InputLabel htmlFor="customer_name">Full Name</InputLabel>
                    <Input id="customer_name" />
                </FormControl>
                <FormControl id="phone">
                    <InputLabel htmlFor="customer_phone">Phone Number</InputLabel>
                    <Input id="customer_phone" />
                </FormControl>
                <FormControl id="email">
                    <InputLabel htmlFor="customer_email">Email Address</InputLabel>
                    <Input id="customer_email" />
                </FormControl>
            </div>

            <body>
                <form id="ava_time" className={classes.container} noValidate>
                    <TextField
                        id="datetime-local"
                        label="Available Time Slot"
                        type="datetime-local"
                        defaultValue="2020-06-06T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </body>

            <div id="row">
                {/* TODO: submit form */}
                <Button variant="contained" color="primary">
                    Reserve!
                </Button>
            </div>

            <div id="schedule">
                {/* TODO: show schedule */}
                <h1>Schedule Used to Reserve</h1>
            </div>
        </div>
    );
}
