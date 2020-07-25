import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { getReservations } from "../api/customer";
import { getStores } from "../api/owner";

const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
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

export default function Confirmation() {
    const classes = useStyles();
    const { reservationID } = parseInt(Object.values(useParams()));
    const [state, setState] = useState({
        user_id: 1, // TODO: Given / remove hard-coded ID
        store_id: "", // getReservations(state.user_id, {})
        barber_id: "", // getReservations(state.user_id, {})

        user_name: "Michael Scott", // TODO: remove hard-coded ID
        store_name: "", // getStores(body)
        barber_name: "Jerry Seinfel", // getBarbers(body) => barber_id, store_id
        start_time: "2020-06-06 10:30am", // getReservations(state.user_id, {})
        service: "Waxing", // getReservations(state.user_id, {})
    });

    function getReservationInfo() {
        // TODO: api functions need to fix looping problem
        getReservations(state.user_id, {})
            .then((res) => {
                console.log("get Info1: ", res);
                if (Object.values(res) !== null) {
                    for (let obj of Object.values(res)) {
                        for (let o of obj) {
                            console.log("HERE TO GET INFO!");
                            console.log(o);
                            console.log("o['reservation_id']", o["reservation_id"]);
                            console.log("reservationID", reservationID);
                            if (o["reservation_id"] === 65) {
                                // TODO: fix setState problem
                                setState({
                                    ...state,
                                    store_id: o["store_id"],
                                    barber_id: o["barber_id"],
                                    start_time: o["from"],
                                    service: o["service"],
                                });

                                console.log("store_id orig: ", o["store_id"]);
                                console.log("barber_id orig: ", o["barber_id"]);
                                console.log("store_id: ", state.store_id);
                                console.log("barber_id: ", state.barber_id);
                            }
                        }
                    }
                }
            })
            .catch(() => console.log("rating page get Info error"));

        // TODO: remove hard-coded ID / setState problem for store_id
        getStores({ store_id: 11 }).then((res) => {
            setState({ ...state, store_name: res[0]["store"]["name"] });
        });
    }

    useEffect(() => {
        getReservationInfo();
    }, []);

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div className={classes.wrapper}>
            <div>
                <h1 className={classes.header}>Thank you for booking with us!</h1>
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
