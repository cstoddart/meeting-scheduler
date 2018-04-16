import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { subDays, addDays } from 'date-fns';

import { hourScale } from '../../constants';
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
    this.calendar = createRef();
    this.state = {
      calendarView: new Date(),
    };
  }

  async componentDidMount() {
    await this.props.getEvents();
    this.calendar.current.style.setProperty('--hourScale', `${hourScale}px`);
    document.addEventListener('keyup', (event) => this.calendarShortcuts(event));
    this.calendar.current.focus();
  }

  calendarShortcuts(event) {
    if (event.shiftKey && event.key === 'ArrowRight') {
      this.changeView(addDays(this.state.calendarView, 1));
    } else if (event.shiftKey && event.key === 'ArrowLeft') {
      this.changeView(subDays(this.state.calendarView, 1));
    }
  }

  changeView(calendarView) {
    this.setState({ calendarView });
    this.props.getEvents({ calendarView });
  }

  render() {
    return (
      <div className="calendar" ref={this.calendar}>
        {this.props.roomEvents.length ?
          <Loading />
          // <CalendarContent roomEvents={this.props.roomEvents} changeView={(calendarView) => this.changeView(calendarView)} calendarView={this.state.calendarView} />
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
