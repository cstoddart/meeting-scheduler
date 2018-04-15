import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { format, subDays, addDays } from 'date-fns';

import { roomsArray } from '../../../constants/rooms';
import './CalendarSidebar.css';

const CalendarSidebar = forwardRef((props, ref) => (
  <div className="calendarSidebar">
    <div className="calendarControls">
      <div className="calendarDate">
        <span>{format(props.calendarView, 'dddd')}</span>
        <span>{format(props.calendarView, 'MMM D')}</span>
      </div>
      <div className="prevDate" onClick={() => props.changeView(subDays(props.calendarView, 1))} />
      <div className="nextDate" onClick={() => props.changeView(addDays(props.calendarView, 1))} />
    </div>
    <div className="calendarRowHeaders" ref={ref}>
      {props.roomEvents.map((r) => {
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
));

CalendarSidebar.propTypes = {
  calendarView: PropTypes.instanceOf(Date),
  changeView: PropTypes.func,
  roomEvents: PropTypes.arrayOf(PropTypes.object),
};

export default CalendarSidebar;
