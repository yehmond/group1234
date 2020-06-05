import React from "react";
import MaterialTable, { Column } from "material-table";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Row {
    time: string;
    barbershop: string;
    barberName: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    passdata: Row[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: "5rem",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            paddingBottom: "5rem",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgb(237, 250, 255)",
        },
        header: {
            paddingBottom: "3rem",
        }
    })
);

export default function MyReservations(): JSX.Element {
    const classes = useStyles();
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: "Time", field: "time" },
            { title: "Barbershop", field: "barbershop" },
            { title: "Barber Name", field: "barberName" },
        ],
        passdata: [
            {
                time: "Tue May 15, 11:15 am",
                barbershop: "Tonys Barbershop",
                barberName: "Tony",
            },
            {
                time: "Fri May 21, 2:00 pm",
                barbershop: "Timmys Barbershop",
                barberName: "Sam",
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
                <h2 className={classes.header}>Pass Reservations</h2>
                <MaterialTable
                    title="Pass Reservations Details"
                    columns={state.columns}
                    data={state.passdata}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.passdata];
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
                                            const data = [...prevState.passdata];
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
                                        const data = [...prevState.passdata];
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
