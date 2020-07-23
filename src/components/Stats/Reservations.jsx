import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { reservationBarber, reservationDate } from "../../utils/utils";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";

export default function Reservations(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            <Title>Recent Reservations</Title>
            <TableContainer>
                <Table size="small" stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Barber</TableCell>
                            <TableCell>Service</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.reservations
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((reservation, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {reservationDate(reservation)}
                                    </TableCell>
                                    <TableCell>{reservation.user_id}</TableCell>
                                    <TableCell>
                                        {reservationBarber(
                                            props.barbers,
                                            reservation
                                        )}
                                    </TableCell>
                                    <TableCell>{reservation.service}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={props.reservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}
