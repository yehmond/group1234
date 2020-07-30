import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { isMobile, reservationBarber, reservationDate } from "../../utils/utils";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import "./stats.scss";

// template taken from https://material-ui.com/getting-started/templates/dashboard/
export default function Reservations(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(isMobile() ? 3 : 5);

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
            <TableContainer id="reservation-stats">
                <Table size="small" stickyHeader={true}>
                    {!isMobile() && (
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Barber</TableCell>
                                <TableCell>Service</TableCell>
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {props.reservations
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((reservation, index) => (
                                <React.Fragment key={index}>
                                    {isMobile() && (
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Barber</TableCell>
                                            <TableCell>Service</TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow>
                                        <TableCell>
                                            {reservationDate(reservation)}
                                        </TableCell>
                                        <TableCell>
                                            {reservation.user_name}
                                        </TableCell>
                                        <TableCell>
                                            {reservationBarber(
                                                props.barbers,
                                                reservation
                                            )}
                                        </TableCell>
                                        <TableCell>{reservation.service}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                3,
                                5,
                                10,
                                25,
                                { label: "All", value: -1 },
                            ]}
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
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
