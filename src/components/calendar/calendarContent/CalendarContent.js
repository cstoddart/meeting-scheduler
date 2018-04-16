import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as mobxTypes } from 'mobx-react';

import { hourScale } from '../../../constants';
import CalendarHeader from '../calendarHeader/CalendarHeader';
import CalendarSidebar from '../calendarSidebar/CalendarSidebar';
import CalendarRows from '../calendarRows/CalendarRows';
import EventView from '../eventView/EventView';
import './CalendarContent.css';

class CalendarContent extends Component {
  constructor(props) {
    super(props);

    this.calendarRows = createRef();
    this.calendarHeader = createRef();
    this.calendarSidebar = createRef();
    this.eventView = createRef();

    this.state = {
      selectedEvent: undefined,
    };
  }

  componentDidMount() {
    const scrollBarWidth = this.calendarRows.current.offsetWidth - this.calendarRows.current.clientWidth;
    this.calendarRows.current.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);
    this.calendarHeader.current.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);
    this.calendarSidebar.current.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);

    // const currentHours = new Date().getHours();
    const currentHours = 7;
    this.calendarRows.current.scrollLeft = ((currentHours - 0.5) * hourScale);
    this.calendarHeader.current.children[0].scrollLeft = ((currentHours - 0.5) * hourScale);
    this.calendarHeader.current.scrollLeft = ((currentHours - 0.5) * hourScale);
  }

  matchScroll() {
    this.calendarHeader.current.scrollLeft = this.calendarRows.current.scrollLeft;
    this.calendarSidebar.current.children[1].scrollTop = this.calendarRows.current.scrollTop;
  }

  resetSelectedEvent(event) {
    if (event.target !== this.eventView.current) {
      return;
    }

    if (this.state.selectedEvent) {
      this.setState({ selectedEvent: undefined });
    }
  }

  render() {
    return (
      <div className="calendarContent">
        <CalendarHeader ref={this.calendarHeader} matchScroll={() => this.matchScroll()} />
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
          resetSelectedEvent={this.resetSelectedEvent}
        />
        {this.state.selectedEvent &&
          <EventView
            ref={this.eventView}
            event={this.state.selectedEvent}
            resetSelectedEvent={(e) => this.resetSelectedEvent(e)}
          />
        }
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
