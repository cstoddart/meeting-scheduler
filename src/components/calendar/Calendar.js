import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

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
  }

  changeView(calendarView) {
    this.setState({ calendarView });
    this.props.getEvents({ calendarView });
  }

  render() {
    return (
      <Fragment>
        {this.props.roomEvents.length ?
          <div className="calendar" ref={this.calendar}>
            <CalendarContent roomEvents={this.props.roomEvents} changeView={(calendarView) => this.changeView(calendarView)} calendarView={this.state.calendarView} />
          </div>
          : <Loading />
        }
      </Fragment>
    );
  }
}

Calendar.propTypes = {
  getEvents: PropTypes.func,
  roomEvents: PropTypes.arrayOf(PropTypes.object),
};

export default Calendar;
