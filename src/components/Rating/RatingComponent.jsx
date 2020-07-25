import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { registerReview, getReservations } from "../../api/customer";
import { getStores } from "../../api/owner";

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
        // TODO: need to fix spacing when web is shrinked
        paddingLeft: "28rem",
        paddingRight: "28rem",
        marginTop: "3rem",
        marginBottom: "3rem",
        width: 200,
        display: "flex",
        alignItems: "center",
    },
}));

export default function RatingComponent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [submit, setSubmit] = useState(false);
    const reservationID = parseInt(Object.values(useParams()));
    const [state, setState] = useState({
        user_id: 1, // TODO: remove hard-coded ID
        store_id: "", 
        barber_id: "",
        review: "",
        rating: "",
        store_name: "",
    });

    // registerReview(user_id, store_id, barber_id, review, rating)
    // getReservations(user_id, body)
    // getStores(body) body => store_id, owner_id

    /*  Given: reservation_id
               user_id
        Find:  store_name
               store_id
               barber_id
        Collect: review, rating
     */

    function getInfo() {
        getReservations(state.user_id, {})
        .then((res) => { 
            console.log("get Info1: ", res); 
            if (Object.values(res) !== null) {
                for (let obj of Object.values(res)) {
                    for (let o of obj) {
                        console.log("HERE TO GET INFO!");
                        if (o["reservation_id"] === reservationID){
                            // TODO: fix setState problem
                            setState({ ...state, store_id: o["store_id"] });
                            setState({ ...state, barber_id: o["barber_id"] });
                            console.log("store_id orig: ", o["store_id"]);
                            console.log("barber_id orig: ", o["barber_id"]);
                            console.log("store_id: ", state.store_id);
                            console.log("barber_id: ", state.barber_id);
                        }
                    }
                }
            }
        })
        .catch(() => console.log("rating page get Info error"))
        
        // TODO: remove hard-coded ID / setState problem for store_id
        getStores({ store_id: 11 })
        .then((res) => {
            setState({ ...state, store_name: res[0]["store"]["name"] });
        })
    }

    function handleChange(event) {
        const {
            target: { name, value },
        } = event;
        setState({ ...state, [name]: value });
    }

    function handleSubmit() {
        setSubmit(true);
    }

    useEffect(() => {
        getInfo();
        if (submit) {
            console.log("SUBMIT REVIEW! ", state.user_id, state.store_id, state.barber_id,state.rating, state.review);
            registerReview(
                11, // state.user_id,
                22, // state.store_id,
                33, // state.barber_id,
                state.review,
                state.rating
            )
            .then(() => {
                window.location = "/ratingComplete";
            })
            .catch(() => {
                console.log("submit rating error");
            });
        }
    }, [submit]);

    return (
        <div className={classes.wrapper}>
            <h1>How was {state.store_name}&apos;s service?</h1>
            <form className={classes.name} noValidate autoComplete="off">
                <TextField
                    id="outlined-helperText"
                    label="Your Name"
                    variant="outlined"
                    onClick={handleChange}
                />
            </form>

            <div className={classes.stars}>
                <Rating
                    name="rating"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        setState({ ...state, rating: newValue });
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
                    name="review"
                    onChange={handleChange}
                />
            </form>

            <div>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
}
