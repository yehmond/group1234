import React from "react";
import MaterialTable from "material-table";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            padding: "1rem 3rem",
            alignItems: "center",
            textAlign: "center",
        },
    })
);

export default function ReservationTable(props) {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div>
                <MaterialTable
                    title={props.tableTitle}
                    columns={props.columns}
                    data={props.data}
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
