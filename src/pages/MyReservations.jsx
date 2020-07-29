 import React, { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ReservationTable from "../components/Reservation/ReservationTable";
import GradeIcon from "@material-ui/icons/Grade";
import { useHistory } from "react-router-dom";
import { deleteReservation, getReservations } from "../api/customer";
import { convertDateToString } from "../utils/utils";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogMessage from "../components/Dialog/Dialog";
import Loading from "../components/Loading/Loading";
import { Tab, Tabs } from "@material-ui/core";
import "../components/Reservation/reservation.scss";

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            margin: "0 2rem",
            marginTop: "2rem",
            alignItems: "center",
        },
    })
);

export default function MyReservations() {
    const classes = useStyles();
    const history = useHistory();
    const columns = [
        { title: "Time", field: "from", editable: "never" },
        { title: "Barbershop", field: "store_name", editable: "never" },
        { title: "Barber Name", field: "barber_name", editable: "never" },
    ];
    const [past, setPast] = React.useState(null);
    const [future, setFuture] = React.useState(null);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);
    const [deleteError, setDeleteError] = React.useState(false);
    const [showPage, setShowPage] = React.useState("CURRENT");

    const handleTabChange = (event, value) => {
        setShowPage(value);
    };

    const handleRate = (rowData) => {
        history.push(
            `/reservations/${rowData.reservation_id}/rate?store=${rowData.store_id}&barber=${rowData.barber_id}&storename=${rowData.store_name}`
        );
    };

    const handleDelete = (rowData) => {
        deleteReservation(rowData.reservation_id).then((response) => {
            if (response) setDeleteSuccess(true);
            if (!response) setDeleteError(true);
        });
    };

    useEffect(() => {
        async function fetchReservations() {
            const past = await getReservations(window.localStorage.getItem("id"), {
                to: new Date(),
            });
            if (past) {
                for (let reservation of past.reservations) {
                    reservation.from = convertDateToString(reservation.from);
                }
                setPast(past.reservations);
            }
            const future = await getReservations(
                window.localStorage.getItem("id"),
                { from: new Date() }
            );
            if (future) {
                for (let reservation of future.reservations) {
                    reservation.from = convertDateToString(reservation.from);
                }
                setFuture(future.reservations);
            }
        }
        fetchReservations();
    }, []);

    if (!past || !future) return <Loading />;

    return (
        <div id="my-reservations" className={classes.wrapper}>
            <h1>My Reservations</h1>
            <Tabs
                value={showPage}
                onChange={(event, value) => handleTabChange(event, value)}
                centered
            >
                <Tab label="Current" value={"CURRENT"} />
                <Tab label="Past" value={"PAST"} />
            </Tabs>
            {showPage === "CURRENT" && (
                <ReservationTable
                    tableTitle="Current Details"
                    actionTooltip="Delete"
                    data={future}
                    columns={columns}
                    actionIcon={DeleteIcon}
                    actionFunction={handleDelete}
                />
            )}
            {showPage === "PAST" && (
                <ReservationTable
                    tableTitle="Past Details"
                    actionTooltip="Rate"
                    data={past}
                    columns={columns}
                    actionIcon={GradeIcon}
                    actionFunction={handleRate}
                />
            )}

            {deleteSuccess && (
                <DialogMessage
                    title={"Success!"}
                    link={"/reservations"}
                    text={"The reservation has been successfully deleted!"}
                />
            )}
            {deleteError && (
                <DialogMessage
                    title={"Error!"}
                    link={"/reservations"}
                    text={"The reservation was not deleted. Try again."}
                />
            )}
        </div>
    );
}
