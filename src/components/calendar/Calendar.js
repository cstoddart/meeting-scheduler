import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { subDays, addDays } from 'date-fns';

import CalendarRows from './calendarRows/CalendarRows';
import './Calendar.css';

@inject(({ store }) => ({
  getEvents: store.getEvents,
  roomEvents: store.roomEvents,
}))
@observer
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarView: new Date(),
    };
  }
  componentDidMount() {
    this.props.getEvents();
  }

  changeView(calendarView) {
    this.setState({ calendarView });
    this.props.getEvents({ calendarView });
  }

  render() {
    return (
      <div className="calendar">
        <h1>Calendar</h1>
        <div className="calendarHead">
          <button onClick={() => this.changeView(subDays(this.state.calendarView, 1))}>Left</button>
          <button onClick={() => this.changeView(addDays(this.state.calendarView, 1))}>Right</button>
        </div>
        <h1>{this.state.calendarView.toString()}</h1>
        {this.props.roomEvents.length ?
          <CalendarRows roomEvents={this.props.roomEvents} />
          : <div>Loading Events</div>
        }
      </div>
    );
  }
}

Calendar.propTypes = {
  getEvents: PropTypes.func,
  roomEvents: PropTypes.arrayOf(PropTypes.object),
};

export default Calendar;
