import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { withRouter } from "react-router-dom";
import "./viewSchedule.scss";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import _ from "lodash";
import { getStores } from "../../../api/owner";
import {
    convertReservationToEvent,
    getBarberColor,
    getEarliestAndLatest,
} from "../../../utils/utils";
import Loading from "../../Loading/Loading";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

class ViewSchedule extends Component {
    constructor(props) {
        super(props);
        this.localizer = momentLocalizer(moment);
        this.state = {
            minTime: getEarliestAndLatest(props.location.hours)[0],
            maxTime: getEarliestAndLatest(props.location.hours)[1],
            selected: [],
            barbers: props.location.barbers,
            allEvents: props.location.reservations,
            eventsToShow: [],
            id: props.match.params.storeID,
            colors: getBarberColor(props.location.barbers),
        };
        this.handleChange = this.handleChange.bind(this);
        this.eventPropGetter = this.eventPropGetter.bind(this);
    }

    componentDidMount() {
        // for a refresh, need to fetch
        if (!this.props.location.reservations || !this.props.location.barbers) {
            getStores({ store_id: this.state.id }).then((response) => {
                let reservations = null;
                let barbers = null;
                let hours = null;
                // will only be one store
                if (response !== null) {
                    for (let obj of response) {
                        reservations = obj.reservations.map((reservation) => {
                            return convertReservationToEvent(
                                obj.barbers,
                                reservation
                            );
                        });
                        barbers = obj.barbers;
                        hours = obj.store.hours;
                    }
                    this.setState({
                        allEvents: reservations,
                        barbers: barbers,
                        colors: getBarberColor(barbers),
                        minTime: getEarliestAndLatest(hours)[0],
                        maxTime: getEarliestAndLatest(hours)[1],
                    });
                } else {
                    // this store doesn't exist (should not be possible
                }
            });
        }
    }

    eventPropGetter(event) {
        const style = {
            backgroundColor: event.color,
        };
        return {
            style: style,
        };
    }

    handleChange(event) {
        this.setState({ selected: event.target.value }, () => {
            const eventsFiltered = this.state.allEvents.filter(
                (event) =>
                    _.map(this.state.selected, "barber_id").indexOf(
                        event.barber_id
                    ) > -1
            );
            this.setState({ eventsToShow: eventsFiltered });
        });
    }
    render() {
        if (!this.state.allEvents || !this.state.barbers) {
            return <Loading />;
        } else if (this.state.allEvents.length === 0) {
            return (
                <Typography className="padding-top" align="center" variant={"h2"}>
                    There are no reservations yet!
                </Typography>
            );
        } else {
            return (
                <div id="view-schedule-content">
                    <h1>View Schedule</h1>
                    <FormControl>
                        <InputLabel>Select a Barber to View</InputLabel>
                        <Select
                            MenuProps={{
                                getContentAnchorEl: () => null,
                            }}
                            multiple
                            value={this.state.selected}
                            onChange={this.handleChange}
                            input={<Input />}
                            renderValue={(selected) =>
                                _.map(selected, "name").join(", ")
                            }
                        >
                            {this.state.barbers.map((barber) => (
                                <MenuItem key={barber.barber_id} value={barber}>
                                    <Checkbox
                                        style={{
                                            "color": this.state.colors[
                                                barber.barber_id
                                            ],
                                        }}
                                        checked={
                                            _.map(
                                                this.state.selected,
                                                "barber_id"
                                            ).indexOf(barber.barber_id) > -1
                                        }
                                    />
                                    <ListItemText primary={barber.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div id={"chips-container-barbers"}>
                        {this.state.barbers.map((barber) => {
                            return (
                                <Chip
                                    label={barber.name}
                                    key={barber.barber_id}
                                    style={{
                                        "backgroundColor": this.state.colors[
                                            barber.barber_id
                                        ],
                                    }}
                                />
                            );
                        })}
                    </div>
                    <Calendar
                        localizer={this.localizer}
                        events={this.state.eventsToShow}
                        titleAccessor={(event) => {
                            return event.title + ": " + event.service;
                        }}
                        defaultView={"week"}
                        min={this.state.minTime}
                        max={this.state.maxTime}
                        style={{ height: "100%" }}
                        views={["day", "week"]}
                        selector={false}
                        eventPropGetter={(event) => ({
                            style: {
                                backgroundColor: event.color,
                            },
                        })}
                    />
                </div>
            );
        }
    }
}

export default withRouter(ViewSchedule);
