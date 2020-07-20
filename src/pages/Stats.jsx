import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./../components/Stats/Chart";
import Deposits from "./../components/Stats/TotalReservations";
import Orders from "./../components/Stats/Reservations";
import { getStore } from "../api/owner";
import Loading from "../components/Loading/Loading";
import { sortReservations } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        margin: "1rem",
        paddingTop: "1.5rem",
        paddingLeft: "1rem",
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
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 300,
    },
}));

export default function Stats() {
    const [store, setStore] = useState(null);
    const location = useLocation();
    const { storeID } = useParams();
    useEffect(() => {
        if (!location.shop) {
            getStore({ store_id: storeID }).then((response) => {
                // will only be one store
                if (response !== null) {
                    for (let obj of response) {
                        setStore(obj);
                    }
                }
            });
        } else {
            setStore(location.shop);
        }
    }, [location.shop, storeID]);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if (!store) {
        return <Loading />;
    } else {
        return (
            <div className={classes.root}>
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
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <Deposits
                                        reservations={sortReservations(
                                            store.reservations
                                        )}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Orders
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
