import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { hours, hourScale } from '../../../constants';
import GridLines from '../gridLines/GridLines';
import Event from '../event/Event';
import './CalendarRows.css';

const CalendarRows = forwardRef((props, ref) => (
  <div className="calendarRows" ref={ref} onScroll={props.matchScroll}>
    <GridLines />
    <div>
      {props.roomEvents.map((room, index) => (
        <div key={`calendarRow${index}`} className="calendarRow">
          {hours.map((hour, i) => (
            <div className="calendarRowSections" style={{ left: `${hour * hourScale}px` }} key={`calendarRowSections${i}`}>
              <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour)} />
              <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour + 0.25)} />
              <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour + 0.5)} />
              <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour + 0.75)} />
            </div>
          ))}
          {room.events.length ?
            room.events.map((event) => (
              <Event
                key={event.id}
                event={event}
                selectEvent={(eventId) => props.selectEvent(eventId)}
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
  selectEvent: PropTypes.func,
  selectedEvent: PropTypes.string,
};

export default CalendarRows;
