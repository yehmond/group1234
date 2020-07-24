import React, { useEffect } from "react";
// TODO: import useState
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { getReservations } from "../api/customer";

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
    // const [store, setStore] = useState(null);
    const { reservationID } = useParams();
    console.log("re ID: ", reservationID);
    const userID = 1; // TODO: remove hard-coded id
    // TODO: need to fix
    useEffect(() => {
        getReservations(
            { user_id: userID },
            { "start_time": "", "end_time": "" }
        ).then((response) => {
            console.log("get Reservations: ", response);
        });
    }, [userID]);

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
                        User ID: store.user_id
                    </Box>
                    <Box
                        className={classes.box}
                        display="block"
                        displayPrint="none"
                    >
                        User Name: store.user_name
                    </Box>
                    <Box
                        className={classes.box}
                        display="block"
                        displayPrint="none"
                    >
                        Barbershop Name: store.store_name
                    </Box>
                    <Box
                        className={classes.box}
                        display="block"
                        displayPrint="none"
                    >
                        Barber: store.barber_name
                    </Box>
                    <Box
                        className={classes.box}
                        display="block"
                        displayPrint="none"
                    >
                        Start Time: store.start_time
                    </Box>
                    <Box
                        className={classes.box}
                        display="block"
                        displayPrint="none"
                    >
                        Service(s): store.service
                    </Box>
                </div>
            </div>
        </div>
    );
}
