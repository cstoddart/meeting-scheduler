import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import GridLines from '../gridLines/GridLines';
import Event from '../event/Event';
import './CalendarRows.css';

const CalendarRows = forwardRef((props, ref) => (
  <div className="calendarRows" ref={ref} onScroll={props.matchScroll}>
    <GridLines />
    <div>
      {props.roomEvents.map((room, index) => (
        <div key={`${room.name}${index}`} className="calendarRow">
          {room.events.length ?
            room.events.map((event) => (
              <Event
                key={event.id}
                event={event}
                selectEvent={(eventId) => props.setEvent({ selectedEvent: eventId })}
                isSelected={props.selectedEvent}
              />
            )) : null
          }
        </div>
      ))}
    </div>
  </div>
));

CalendarRows.propTypes = {
  matchScroll: PropTypes.func,
  roomEvents: PropTypes.arrayOf(PropTypes.object),
  setEvent: PropTypes.func,
  selectedEvent: PropTypes.string,
};

export default CalendarRows;
