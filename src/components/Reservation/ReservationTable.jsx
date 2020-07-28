import React from "react";
import MaterialTable from "material-table";
import "./reservation.scss";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { isMobile } from "../../utils/utils";

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            padding: "1rem 3rem",
            alignItems: "center",
            textAlign: "center",
            ["@media (max-width:1000px)"]: {
                padding: "0",
            },
        },
    })
);

export default function ReservationTable(props) {
    const options = {
        search: !isMobile(),
    };
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div>
                <MaterialTable
                    title={props.tableTitle}
                    columns={props.columns}
                    data={props.data}
                    editable={false}
                    options={options}
                    actions={[
                        {
                            icon: props.actionIcon,
                            tooltip: props.actionTooltip,
                            onClick: (event, rowData) => {
                                props.actionFunction(rowData);
                            },
                        },
                    ]}
                />
            </div>
        </div>
    );
}
