import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { SERVICES_OFFERED } from "../../utils/constants";
import { useDispatch } from "react-redux";
// import { setService } from "../../actions/filterActions";

const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            margin: "3rem",
            padding: "3rem",
            alignItems: "center",
            textAlign: "center",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
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
            paddingBottom: "2rem"
        },
    })
);

export default function Reservation() {
    const classes = useStyles();

    const [serviceState, setServiceState] = React.useState(
        Object.fromEntries(SERVICES_OFFERED.map((service) => [service, false]))
    );
    
    const handleChange = (event) => {
        const newServiceState = {
            ...serviceState,
            [event.target.name]: event.target.checked,
        };
        setServiceState(newServiceState);
        // dispatch(setService(newServiceState));
    };

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

            <div className={classes.serviceSelection}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select the service(s) for this booking</FormLabel>
                    <FormGroup>
                        {SERVICES_OFFERED.map((service) => {
                            return (
                                <FormControlLabel
                                    key={service}
                                    control={
                                        <Checkbox
                                            checked={serviceState[service]}
                                            onChange={handleChange}
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
                {/* TODO: submit form */}
                <Button variant="contained" color="primary">
                    Reserve
                </Button>
            </div>

            <div className={classes.schedule}>
                {/* TODO: show schedule */}
                <h1>Schedule Used to Reserve</h1>
            </div>
        </div>
    );
}
