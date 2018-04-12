import React, { Component } from 'react';
import { PropTypes as mobxTypes } from 'mobx-react';

import { hourSize, hours } from '../../../constants';
import { toStandardTime } from '../../../utils';
import Event from '../event/Event';
import GridLines from '../gridLines/GridLines';
import './CalendarContent.css';

class CalendarContent extends Component {
  constructor(props) {
    super(props);
    this.scrollController = React.createRef();
    this.calendarHeader = React.createRef();
    this.calendarSidebar = React.createRef();
    this.state = {
      selectedEvent: '',
    };
  }

  componentDidMount() {
    const currentHours = new Date().getHours();
    this.scrollController.current.scrollLeft = ((currentHours - 0.5) * hourSize);
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
              <div className="hourMarker" style={{ left: `${hour * hourSize}px` }}>
                {toStandardTime({ hours: hour })}
              </div>
            ))}
          </div>
        </div>
        <div className="calendarSidebar">
          <div className="calendarRowHeaders" ref={this.calendarSidebar}>
            {this.props.roomEvents.map((room) => (
              <div key={room.name} className="calendarRowHeader">
                <h2>{room.name}</h2>
              </div>
            ))}
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
};

export default CalendarContent;
