import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: "3rem",
            padding: "3rem",
            alignItems: "center",
            textAlign: "center",
            fontFamily: "Palatino",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
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
        reserveHeader: {},
    })
);

export default function Reservation(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            {/* TODO: this.props.shopname */}
            <div className={classes.reserveHeader}>
                <h1>Make Your Reservation With Tony&apos;s Barbershop!</h1>
            </div>

            <div className={classes.container}>
                <FormControl id="name" className={classes.textInput}>
                    <InputLabel htmlFor="customer_name">Full Name</InputLabel>
                    <Input id="customer_name" />
                </FormControl>
                <FormControl id="phone" className={classes.textInput}>
                    <InputLabel htmlFor="customer_phone">Phone Number</InputLabel>
                    <Input id="customer_phone" />
                </FormControl>
                <FormControl id="email" className={classes.textInput}>
                    <InputLabel htmlFor="customer_email">Email Address</InputLabel>
                    <Input id="customer_email" />
                </FormControl>
            </div>

            <body>
                <form className={classes.container} noValidate>
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

            <div>
                {/* TODO: submit form */}
                <Button variant="contained" color="primary">
                    Reserve!
                </Button>
            </div>

            <div className={classes.schedule}>
                {/* TODO: show schedule */}
                <h1>Schedule Used to Reserve</h1>
            </div>
        </div>
    );
}
