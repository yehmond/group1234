import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { events, mockBarbers, mockStore, resources } from "../../../utils/stubbedData";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from "react-router-dom";
import './viewSchedule.scss';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import _ from 'lodash';


class ViewSchedule extends Component {
    constructor(props) {
        super(props);
        this.localizer = momentLocalizer(moment);
        this.id = this.props.match.params.storeID;
        // query for store from backend
        this.minTime = new Date()
        this.minTime.setHours(7,0,0);
        this.maxTime = new Date();
        this.maxTime.setHours(20,30,0);
        this.state = {selected: [], events: [], barbers: mockBarbers};
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event){
        console.log(event.target.value);
        this.setState({selected: event.target.value}, () => {
            const eventsFiltered = events.filter(event => _.map(this.state.selected, 'id').indexOf(event.barberId) > -1);
            this.setState({events: eventsFiltered});
        });
    }
    render() {
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
                        renderValue={(selected) => _.map(selected, 'name').join(', ')}
                    >
                        {this.state.barbers.map((barber) => (
                            <MenuItem key={barber.id} value={barber}>
                                <Checkbox checked={_.map(this.state.selected, 'id').indexOf(barber.id) > -1}/>
                                <ListItemText primary={barber.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Calendar
                localizer={this.localizer}
                events={this.state.events}
                titleAccessor={(event)=> {
                    console.log(event);
                    return event.title}}
                defaultView={'week'}
                min= {this.minTime}
                max={this.maxTime}
                style={{ height: '100%' }}
                views={['day','week']}
                selector={false}
                />
            </div>
        );
    }
}

export default withRouter(ViewSchedule);
