import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// import { subDays, addDays } from 'date-fns';

import CalendarContent from './calendarContent/CalendarContent';
import Loading from '../loading/Loading';
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
        {this.props.roomEvents.length ?
          <CalendarContent roomEvents={this.props.roomEvents} changeView={(calendarView) => this.changeView(calendarView)} calendarView={this.state.calendarView} />
          : <Loading />
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
