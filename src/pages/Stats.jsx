import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./../components/Stats/Chart";
import TotalReservations from "./../components/Stats/TotalReservations";
import Reservations from "./../components/Stats/Reservations";
import { getStores } from "../api/owner";
import Loading from "../components/Loading/Loading";
import { checkMyStore, sortReservations } from "../utils/utils";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        margin: "0.5rem",
        paddingTop: "1.5rem",
        paddingLeft: "1rem",
        ["@media (max-width:1000px)"]: { // eslint-disable-line no-useless-computed-key
            padding: "0",
            margin: "1rem",
        },
    },
    content: {
        flexGrow: 1,
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
    },
    centerCard: {
        placeSelf: "center",
    },
}));

export default function Stats() {
    const [store, setStore] = useState(null);
    const [ownerID, setOwnerID] = useState(null);
    const location = useLocation();
    const { storeID } = useParams();
    useEffect(() => {
        if (!location.shop) {
            getStores({ store_id: storeID }).then((response) => {
                // will only be one store
                if (response !== null) {
                    for (let obj of response) {
                        setStore(obj);
                        setOwnerID(obj.store.owner_id);
                    }
                }
            });
        } else {
            setStore(location.shop);
            setOwnerID(location.shop.shopOwnerID);
        }
    }, [location.shop, storeID]);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper);

    if (!store) {
        return <Loading />;
    } else if (!checkMyStore(ownerID)) {
        return (
            <Typography align="center" variant={"h2"} style={{ "padding": "5vw" }}>
                You are not authorized to view this page
            </Typography>
        );
    } else {
        return (
            <div className={classes.root} id="stats-styling">
                <h1 className={classes.title}>Statistics</h1>
                <main className={classes.content}>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart
                                        reservations={sortReservations(
                                            store.reservations
                                        )}
                                        barbers={store.barbers}
                                    />
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                lg={3}
                                className={classes.centerCard}
                            >
                                <Paper className={fixedHeightPaper}>
                                    <TotalReservations
                                        reservations={sortReservations(
                                            store.reservations
                                        )}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Reservations
                                        reservations={sortReservations(
                                            store.reservations
                                        )}
                                        barbers={store.barbers}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}
