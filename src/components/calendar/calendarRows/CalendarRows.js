import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { PropTypes as mobxTypes } from 'mobx-react';

import { hourSize } from '../../../constants';
import Event from '../event/Event';
import GridLines from '../gridLines/GridLines';
import './CalendarRows.css';

class CalendarRows extends Component {
  constructor(props) {
    super(props);
    this.scrollBox = React.createRef();
    this.state = {
      selectedEvent: '',
    };
  }

  componentDidMount() {
    const currentHours = new Date().getHours();
    this.scrollBox.current.scrollLeft = ((currentHours - 0.5) * hourSize);
  }

  render() {
    console.log('SELECTED EVENT', this.state.selectedEvent);
    return (
      <div className="calendarRows">
        <div className="rowHeaders">
          {this.props.roomEvents.map((room) => (
            <div key={room.name} className="rowHeader">
              <h2>{room.name}</h2>
            </div>
          ))}
        </div>
        <div className="rowsContainer"ref={this.scrollBox}>
          <GridLines />
          <div className="rows">
            {this.props.roomEvents.map((room, index) => (
              <div key={`${room.name}${index}`} className="rowContent">
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

CalendarRows.propTypes = {
  roomEvents: mobxTypes.observableArray,
};

export default CalendarRows;
