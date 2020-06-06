import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    DayView,
    Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles, Theme } from "@material-ui/core";

type StoreId = {
    id: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    outline: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.4rem",
        padding: "1.5rem",
        margin: "2%",
        height: "60rem",
    },
    container: {
        backgroundColor: "rgba(255,255,255,0.8)",
        height: "100%",
    },
    scheduleContainer: {
        padding: "0.1rem",
        height: "100%",
    },
}));

export default function StoreSchedule({ id }: StoreId): JSX.Element {
    const classes = useStyles();
    const currentDate = "2018-11-01";
    const schedulerData = [
        {
            startDate: "2018-11-01T09:45",
            endDate: "2018-11-01T11:00",
            title: "Meeting",
        },
        {
            startDate: "2018-11-01T12:00",
            endDate: "2018-11-01T13:30",
            title: "Go to a gym",
        },
    ];
    return (
        <>
            <div className={classes.outline}>
                <div className={classes.container}>
                    <div className={classes.scheduleContainer}>
                        <Paper className={classes.scheduleContainer}>
                            <Scheduler data={schedulerData}>
                                <ViewState currentDate={currentDate} />
                                <DayView startDayHour={0} endDayHour={24} />
                                <Appointments />
                            </Scheduler>
                        </Paper>
                    </div>
                </div>
            </div>
        </>
    );
}
