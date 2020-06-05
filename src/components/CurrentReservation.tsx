import React from "react";
// import "./CSS/myReservationCSS.css";
import MaterialTable, { Column } from "material-table";

interface Row {
    time: string;
    barbershop: string;
    barberName: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    currdata: Row[];
}

export default function MyReservations(): JSX.Element {
    const [state, setState] = React.useState<TableState>({
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
        <div id="wrapper">
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            <div id="row">
                <h2>Current Reservation</h2>
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
