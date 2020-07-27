import React from "react";
import SearchFilter from "./SearchFilter";
import DateFilter from "./DateFilter";
import TimeFilter from "./TimeFilter";
import PriceFilter from "./PriceFilter";
import ServiceFilter from "./ServiceFilter";
import RatingFilter from "./RatingSlider";
import NeighbourhoodFilter from "./NeighbourhoodFilter";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down("sm")]: {
            padding: "2rem 1rem",
            width: "100%",
            position: "unset",
        },
        padding: "1rem",
        minWidth: "17rem",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
}));

const filters = {
    "Search": {
        component: <SearchFilter />,
        expanded: true,
        icon: <SearchRoundedIcon />,
    },
    "Date": {
        component: <DateFilter />,
        expanded: true,
        icon: <EventRoundedIcon />,
    },
    "Time": {
        component: <TimeFilter />,
        expanded: true,
        icon: <ScheduleRoundedIcon />,
    },
    "Price Range": {
        component: <PriceFilter />,
        expanded: false,
        icon: <MonetizationOnOutlinedIcon />,
    },
    "Services": {
        component: <ServiceFilter />,
        expanded: false,
        icon: <EmojiPeopleIcon />,
    },
    "Rating": {
        component: <RatingFilter />,
        expanded: false,
        icon: <GradeRoundedIcon />,
    },
    "Neighbourhoods": {
        component: <NeighbourhoodFilter />,
        expanded: false,
        icon: <RoomRoundedIcon />,
    },
};

export default function Filter() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {Object.keys(filters).map((key) => {
                return (
                    <Accordion key={key} defaultExpanded={filters[key].expanded}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {filters[key].icon}
                            <Typography className={classes.e}>
                                &nbsp;{key}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {filters[key].component}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
}
