import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as mobxTypes } from 'mobx-react';
import { format, subDays, addDays } from 'date-fns';

import { hourScale, hours } from '../../../constants';
import { roomsArray } from '../../../constants/rooms';
import { toStandardTime } from '../../../utils';
import Event from '../event/Event';
import GridLines from '../gridLines/GridLines';
import './CalendarContent.css';

class CalendarContent extends Component {
  constructor(props) {
    super(props);
    this.scrollController = createRef();
    this.calendarHeader = createRef();
    this.calendarSidebar = createRef();
    this.state = {
      selectedEvent: '',
    };
  }

  componentDidMount() {
    const currentHours = new Date().getHours();
    this.scrollController.current.scrollLeft = ((currentHours - 0.5) * hourScale);
  }

  matchScroll() {
    this.calendarHeader.current.scrollLeft = this.scrollController.current.scrollLeft;
    this.calendarSidebar.current.scrollTop = this.scrollController.current.scrollTop;
  }

  render() {
    return (
      <div className="calendarContent">
        <div className="calendarHeader" ref={this.calendarHeader}>
          <div className="hourMarkers">
            {hours.map((hour) => (
              <div className="hourMarker" style={{ left: `${hour * hourScale}px` }} key={`hourMarker${hour}`}>
                {hour !== hours.length - 1 &&
                  <Fragment>
                    {toStandardTime({ hours: hour })}
                  </Fragment>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="calendarSidebar">
          <div className="calendarControls">
            <div className="calendarDate">
              <span>{format(this.props.calendarView, 'dddd')}</span>
              <span>{format(this.props.calendarView, 'MMM D')}</span>
            </div>
            <div className="prevDate" onClick={() => this.props.changeView(subDays(this.props.calendarView, 1))} />
            <div className="nextDate" onClick={() => this.props.changeView(addDays(this.props.calendarView, 1))} />
          </div>
          <div className="calendarRowHeaders" ref={this.calendarSidebar}>
            {this.props.roomEvents.map((r) => {
              const room = roomsArray.find((roomItem) => roomItem.name === r.name);
              return (
                <div key={room.name} className="calendarRowHeader">
                  <img className="calendarRowHeaderImg" src={room.imgUrl} />
                  <h2>{room.name}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className="calendarRows" ref={this.scrollController} onScroll={() => this.matchScroll()}>
          <GridLines />
          <div>
            {this.props.roomEvents.map((room, index) => (
              <div key={`${room.name}${index}`} className="calendarRow">
                {room.events.length ?
                  room.events.map((event) => (
                    <Event
                      key={event.id}
                      event={event}
                      selectEvent={(eventId) => this.setState({ selectedEvent: eventId })}
                      isSelected={this.state.selectedEvent}
                    />
                  )) : null
                }
              </div>
            ))}
          </div>
        </div>
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
