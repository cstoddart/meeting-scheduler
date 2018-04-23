import React, { Fragment, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';

import { hours, hourScale } from '../../../constants';
import GridLines from '../gridLines/GridLines';
import Event from '../event/Event';
import './CalendarRows.css';

const CalendarRowSections = (props) => (
  <Fragment>
    {hours.map((hour, i) => (
      <Fragment key={`calendarRowSections${i}`}>
        {hour !== hours.length - 1 &&
          <div className="calendarRowSections" style={{ left: `${hour * hourScale}px` }}>
            <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour)} />
            <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour + 0.25)} />
            <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour + 0.5)} />
            <div className="calendarRowSection" onClick={() => props.showCreateEvent(hour + 0.75)} />
          </div>
        }
      </Fragment>
    ))}
  </Fragment>
);

const Events = (props) => (
  props.events.map((event) => (
    <Event
      key={event.id}
      event={event}
      selectEvent={(eventId) => props.selectEvent(eventId)}
    />
  ))
);

const CalendarRows = forwardRef((props, ref) => (
  <div className="calendarRows" ref={ref} onScroll={props.matchScroll}>
    <GridLines />
    <div>
      {props.roomEvents.map((room, index) => (
        <div key={`calendarRow${index}`} className="calendarRow">
          <CalendarRowSections showCreateEvent={() => props.showCreateEvent()} />
          {room.events.length ?
            <Events events={room.events} />
            : null
          }
        </div>
      ))}
    </div>
  </div>
));

CalendarRowSections.propTypes = {
  showCreateEvent: PropTypes.func.isRequired,
};

Events.propTypes = {
  events: MobXTypes.observableArray,
};

CalendarRows.propTypes = {
  matchScroll: PropTypes.func.isRequired,
  roomEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  showCreateEvent: PropTypes.func.isRequired,
};

export default CalendarRows;
