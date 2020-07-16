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
import { getStore } from "../../../api/owner";
import { convertReservationToEvent } from "../../../utils/utils";
import Loading from "../../Loading/Loading";

class ViewSchedule extends Component {
    constructor(props) {
        super(props);
        this.localizer = momentLocalizer(moment);
        // query for store from backend
        this.minTime = new Date();
        this.minTime.setHours(7, 0, 0);
        this.maxTime = new Date();
        this.maxTime.setHours(20, 30, 0);
        this.state = { selected: [], barbers: props.location.barbers, allEvents: props.location.reservations, eventsToShow: [], id: props.match.params.storeID};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // for a refresh, need to fetch
        if (!this.props.location.reservations || !this.props.location.barbers) {
            getStore({ store_id: this.state.id }).then((response) => {
                let reservations = null;
                let barbers = null;
                // will only be one store
                if(response !== null) {
                    console.log(response);
                    for (let obj of response) {
                       reservations =  obj.reservations.map((reservation) => {return convertReservationToEvent(reservation)});
                       barbers = obj.barbers;
                    }
                    this.setState({ allEvents: reservations , barbers: barbers});
                } else {
                    // this store doesn't exist (should not be possible
                }
            });
        }
    }

    handleChange(event) {
        this.setState({ selected: event.target.value }, () => {
            const eventsFiltered = this.state.allEvents.filter(
                (event) =>
                    _.map(this.state.selected, "barber_id").indexOf(event.barber_id) > -1
            );
            this.setState({ eventsToShow: eventsFiltered });
        });
    }
    render() {
        if(!this.state.allEvents || !this.state.barbers) {
            return <Loading/>;
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
                            input={<Input/>}
                            renderValue={(selected) =>
                                _.map(selected, "name").join(", ")
                            }
                        >
                            {this.state.barbers.map((barber) => (
                                <MenuItem key={barber.barber_id} value={barber}>
                                    <Checkbox
                                        checked={
                                            _.map(this.state.selected, "barber_id").indexOf(
                                                barber.barber_id
                                            ) > -1
                                        }
                                    />
                                    <ListItemText primary={barber.name}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Calendar
                        localizer={this.localizer}
                        events={this.state.eventsToShow}
                        titleAccessor={(event) => {
                            return event.title + ": " + event.service;
                        }}
                        defaultView={"week"}
                        min={this.minTime}
                        max={this.maxTime}
                        style={{ height: "100%" }}
                        views={["day", "week"]}
                        selector={false}
                    />
                </div>
            );
        }
    }
}

export default withRouter(ViewSchedule);
