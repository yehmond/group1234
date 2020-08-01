import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles(() => ({
    root: {
        width: "3rem",
        textAlign: "center",
        border: "solid 1px grey",
        borderRadius: "3px",
        marginRight: "0.5rem",
        padding: "0.25rem",
    },
}));

export default function TimeSlotCard({ time }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="body2" color="textSecondary">
                {moment(time).format("HH:mm")}
            </Typography>
        </div>
    );
}
