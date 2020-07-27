import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DialogMessage from "../Dialog/Dialog";
import { registerReview } from "../../api/customer";
import { SERVICES_OFFERED } from "../../utils/constants";
import { RenderSelect } from "../FormFields/FormFields";

const labels = {
    1: "Poor",
    2: "Acceptable",
    3: "Mediocre",
    4: "Good",
    5: "Excellent",
};

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: "3rem",
        display: "grid",
        gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
        gridRowGap: "10px",
        alignItems: "center",
        textAlign: "center",
    },
    button: {
        width: "200px",
    },
    name: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    text: {
        "& > *": {
            margin: theme.spacing(1),
            width: "100ch",
        },
    },
}));

export default function RatingComponent() {
    const history = useHistory();
    const userID = window.localStorage.getItem("id");
    const search = new URLSearchParams(history.location.search);
    const storeID = search.get("store");
    const barberID = search.get("barber");
    const storeName = search.get("storename");
    const [rating, setRating] = React.useState(0);
    const [content, setContent] = React.useState("");
    const [service, setService] = React.useState("");
    const [hover, setHover] = React.useState(-1);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const classes = useStyles();

    const handleSelectChange = (event) => {
        setService(event.target.value);
    };

    const handleSubmit = () => {
        registerReview(userID, storeID, barberID, content, rating, service).then(
            (response) => {
                if (response) setSuccess(true);
                if (!response) setError(true);
            }
        );
    };

    return (
        <div className={classes.wrapper}>
            <h1>{"How was your experience at " + storeName + "?"}</h1>
            <div className={classes.name}>
                <RenderSelect
                    name="Service"
                    required={true}
                    label="Service Received"
                    options={SERVICES_OFFERED}
                    handleChange={handleSelectChange}
                />
            </div>

            <div>
                <Rating
                    name="hover-feedback"
                    value={rating}
                    size="large"
                    precision={1}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                {rating !== null && (
                    <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
                )}
            </div>
            <TextField
                id="outlined-helperText"
                label="Any comments?"
                variant="outlined"
                multiline={true}
                rows={3}
                onChange={(event, value) => {
                    setContent(event.target.value);
                }}
                InputProps={{
                    className: classes.input,
                }}
            />

            <div>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!service || !content || !rating}
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Submit
                </Button>
            </div>
            {success && (
                <DialogMessage
                    title={"Success!"}
                    link={"/reservations"}
                    text={"Thank you for sharing your experience!"}
                />
            )}
            {error && (
                <DialogMessage
                    title={"Error!"}
                    link={"/reservations"}
                    text={
                        "We weren't able to record your response. Please try again!"
                    }
                />
            )}
        </div>
    );
}
