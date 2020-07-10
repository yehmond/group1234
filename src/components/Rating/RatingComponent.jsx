import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: "3rem",
        padding: "3rem",
        alignItems: "center",
        textAlign: "center",
    },
    name: {
        marginTop: "3rem",
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    text: {
        marginBottom: "3rem",
        "& > *": {
            margin: theme.spacing(1),
            width: "100ch",
        },
    },
    input: {
        height: 100,
    },
    stars: {
        marginLeft: "28rem",
        marginTop: "3rem",
        marginBottom: "3rem",
        width: 200,
        display: "flex",
        alignItems: "center",
    },
}));

export default function RatingComponent() {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <h1>How was Tommy&apos;s Barbershop&apos;s service?</h1>
            <form className={classes.name} noValidate autoComplete="off">
                <TextField
                    id="outlined-helperText"
                    label="Your Name"
                    variant="outlined"
                />
            </form>

            <div className={classes.stars}>
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                {value !== null && (
                    <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
            </div>

            <form className={classes.text} noValidate autoComplete="off">
                <TextField
                    id="outlined-helperText"
                    label="Any comments?"
                    variant="outlined"
                    InputProps={{
                        className: classes.input,
                    }}
                />
            </form>

            <div>
                {/* TODO: submit form */}
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </div>
    );
}
