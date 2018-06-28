import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { format, subDays, addDays } from 'date-fns';

import { ROOMS } from '../../../constants';
import './CalendarSidebar.css';

const CalendarSidebar = forwardRef((props, ref) => (
  <div className="calendarSidebar" ref={ref}>
    <div className="calendarControls">
      <div className="calendarDate">
        <span>{format(props.calendarView, 'dddd')}</span>
        <span>{format(props.calendarView, 'MMM D')}</span>
      </div>
      <div className="prevDate" title="Shift + Left" onClick={() => props.changeView(subDays(props.calendarView, 1))} />
      <div className="nextDate" title="Shift + Right" onClick={() => props.changeView(addDays(props.calendarView, 1))} />
    </div>
    <div className="calendarSidebarItems" onScroll={props.matchScroll} onMouseEnter={() => props.toggleMouseOnSidebar(true)} onMouseLeave={() => props.toggleMouseOnSidebar(false)}>
      {props.roomEvents.map((r) => {
        const room = ROOMS.find((roomItem) => roomItem.name === r.name);
        return (
          <div
            key={room.name}
            className={`calendarSidebarItem ${props.hoveredRow === room.name ? 'active' : null}`}
            onMouseEnter={() => props.setHoveredRow(room.name)}
          >
            <img className="calendarSidebarItemImg" src={room.imgUrl} />
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
