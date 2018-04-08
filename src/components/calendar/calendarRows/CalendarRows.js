import React from 'react';
// import PropTypes from 'prop-types';
import { PropTypes as mobxTypes } from 'mobx-react';

import Event from '../event/Event';
import GridLines from '../gridLines/GridLines';

import './CalendarRows.css';

const CalendarRows = (props) => (
  <div className="calendarRows">
    <div className="rowHeaders">
      {props.roomEvents.map((room) => (
        <div key={room.name} className="rowHeader">
          <h2>{room.name}</h2>
        </div>
      ))}
    </div>
    <div className="rowsContainer">
      <GridLines />
      <div className="rows">
        {props.roomEvents.map((room, index) => (
          <div key={`${room.name}${index}`} className="rowContent">
            {room.events.length ?
              room.events.map((event) => <Event key={event.id} event={event} />) :
              <div key={index}>No Events</div>
            }
          </div>
        ))}
      </div>
    </div>
  </div>
);

CalendarRows.propTypes = {
  roomEvents: mobxTypes.observableArray,
};

export default CalendarRows;
