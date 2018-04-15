import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as mobxTypes } from 'mobx-react';

import { hourScale } from '../../../constants';
import CalendarHeader from '../calendarHeader/CalendarHeader';
import CalendarSidebar from '../calendarSidebar/CalendarSidebar';
import CalendarRows from '../calendarRows/CalendarRows';
import './CalendarContent.css';

class CalendarContent extends Component {
  constructor(props) {
    super(props);

    this.calendarRows = createRef();
    this.calendarHeader = createRef();
    this.calendarSidebar = createRef();

    this.state = {
      selectedEvent: '',
    };
  }

  componentDidMount() {
    const currentHours = new Date().getHours();
    this.calendarRows.current.scrollLeft = ((currentHours - 0.5) * hourScale);
  }

  matchScroll() {
    this.calendarHeader.current.scrollLeft = this.calendarRows.current.scrollLeft;
    this.calendarSidebar.current.scrollTop = this.calendarRows.current.scrollTop;
  }

  render() {
    return (
      <div className="calendarContent">
        <CalendarHeader ref={this.calendarHeader} />
        <CalendarSidebar
          ref={this.calendarSidebar}
          calendarView={this.props.calendarView}
          changeView={this.props.changeView}
          roomEvents={this.props.roomEvents}
        />
        <CalendarRows
          ref={this.calendarRows}
          roomEvents={this.props.roomEvents}
          matchScroll={() => this.matchScroll()}
          setEvent={({ selectedEvent }) => this.setState({ selectedEvent })}
          selectedEvent={this.state.selectedEvents}
        />
      </div>
    );
  }
}

CalendarContent.propTypes = {
  roomEvents: mobxTypes.observableArray,
  changeView: PropTypes.func,
  calendarView: PropTypes.instanceOf(Date),
};

export default CalendarContent;
