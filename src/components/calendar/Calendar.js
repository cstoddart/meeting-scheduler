import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes, observer, inject } from 'mobx-react';
import { subDays, addDays } from 'date-fns';

import { HOUR_SCALE } from '../../constants';
import CalendarHeader from './calendarHeader/CalendarHeader';
import CalendarSidebar from './calendarSidebar/CalendarSidebar';
import CalendarRows from './calendarRows/CalendarRows';
import EventDetails from './eventDetails/EventDetails';
import CreateEvent from './createEvent/CreateEvent';
import Loading from '../ui/loading/Loading';
import './Calendar.css';

@inject(({ store }) => ({
  user: store.user,
  emails: store.emails,
  getEmails: store.getEmails,
  getEvents: store.getEvents,
  roomEvents: store.roomEvents,
}))
@observer
class Calendar extends Component {
  constructor() {
    super();

    this.calendar = createRef();
    this.calendarRows = createRef();
    this.calendarHeader = createRef();
    this.calendarSidebar = createRef();

    this.state = {
      calendarView: new Date(),
      selectedEvent: '',
      selectedRoom: '',
      showEventDetails: false,
      eventHours: '',
      showCreateEvent: false,
      loading: false,
    };
  }

  async componentDidMount() {
    await this.props.getEvents();
    this.calendar.current.style.setProperty('--hourScale', `${HOUR_SCALE}px`);
    document.addEventListener('keyup', (event) => this.calendarShortcuts(event));
    this.calendar.current.focus();

    const scrollBarWidth = this.calendarRows.current.offsetWidth - this.calendarRows.current.clientWidth;
    this.calendarRows.current.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);
    this.calendarHeader.current.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);
    this.calendarSidebar.current.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);

    const currentHours = new Date().getHours();
    this.calendarRows.current.scrollLeft = ((currentHours - 0.5) * HOUR_SCALE);
    this.calendarHeader.current.children[0].scrollLeft = ((currentHours - 0.5) * HOUR_SCALE);
    this.calendarHeader.current.scrollLeft = ((currentHours - 0.5) * HOUR_SCALE);
  }

  calendarShortcuts(event) {
    if (event.shiftKey && event.key === 'ArrowRight') {
      this.changeView(addDays(this.state.calendarView, 1));
    } else if (event.shiftKey && event.key === 'ArrowLeft') {
      this.changeView(subDays(this.state.calendarView, 1));
    }
  }

  async changeView(calendarView) {
    this.setState({ calendarView, loading: true });
    await this.props.getEvents({ calendarView });
    this.setState({ loading: false });
  }

  matchScroll() {
    this.calendarHeader.current.scrollLeft = this.calendarRows.current.scrollLeft;
    this.calendarSidebar.current.children[1].scrollTop = this.calendarRows.current.scrollTop; // targets sidebar items (skips date controls)
  }

  render() {
    return (
      <div className="calendar" ref={this.calendar}>
        <div className="calendarContent" >
          <CalendarHeader ref={this.calendarHeader} />
          <CalendarSidebar
            ref={this.calendarSidebar}
            calendarView={this.state.calendarView}
            changeView={(calendarView) => this.changeView(calendarView)}
            roomEvents={this.props.roomEvents}
          />
          <CalendarRows
            ref={this.calendarRows}
            roomEvents={this.props.roomEvents}
            matchScroll={() => this.matchScroll()}
            selectEvent={(event) => this.setState({ selectedEvent: event, showEventDetails: true })}
            showCreateEvent={(eventHours, room) => this.setState({ showCreateEvent: true, eventHours, selectedRoom: room })}
          />
          {this.state.showEventDetails &&
            <EventDetails
              event={this.state.selectedEvent}
              hideEventDetails={() => this.setState({ showEventDetails: false, selectedEvent: '' })}
            />
          }
          {this.state.showCreateEvent &&
            <CreateEvent
              user={this.props.user}
              emails={this.props.emails}
              room={this.state.selectedRoom}
              eventDate={this.state.calendarView}
              eventHours={this.state.eventHours}
              hideCreateEvent={() => this.setState({ showCreateEvent: false, eventHours: '' })}
            />
          }
        </div>
        <Loading active={!this.props.roomEvents.length || this.state.loading} />
      </div>
    );
  }
}

Calendar.propTypes = {
  user: MobXTypes.observableObject,
  emails: PropTypes.arrayOf(PropTypes.string),
  roomEvents: MobXTypes.observableArray,
  getEvents: PropTypes.func,
};

export default Calendar;
