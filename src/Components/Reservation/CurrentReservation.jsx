import React from "react";
import MaterialTable from "material-table";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            margin: "5rem",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            paddingBottom: "3rem",
            alignItems: "center",
            textAlign: "center",
        },
        header: {
            paddingBottom: "3rem",
        },
    })
);

export default function MyReservations() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            { title: "Time", field: "time" },
            { title: "Barbershop", field: "barbershop" },
            { title: "Barber Name", field: "barberName" },
        ],
        currdata: [
            {
                time: "Sat June 10,  3:25 pm",
                barbershop: "Main Street Barbershop",
                barberName: "Fanny",
            },
        ],
    });

    return (
        <div className={classes.wrapper}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            <div>
                <h2 className={classes.header}>Current Reservation</h2>
                <MaterialTable
                    title="Current Reservations Details"
                    columns={state.columns}
                    data={state.currdata}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.currdata];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState((prevState) => {
                                            const data = [...prevState.currdata];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.currdata];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />
            </div>
        </div>
    );
}
