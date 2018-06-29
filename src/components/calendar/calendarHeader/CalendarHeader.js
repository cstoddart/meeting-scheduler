import React, { Fragment, forwardRef } from 'react';

import { toStandardTime } from '../../../utils';
import { HOUR_SCALE, HOURS } from '../../../constants';
import './CalendarHeader.css';

const currentHours = new Date().getHours();
const currentMinutes = new Date().getMinutes();

const CalendarHeader = forwardRef((props, ref) => (
  <div className="calendarHeader" ref={ref}>
    <div className="calendarHeaderContent" onScroll={props.matchScroll} onMouseEnter={() => props.toggleMouseOnHeader(true)} onMouseLeave={() => props.toggleMouseOnHeader(false)}>
      <div className="hourMarkers">
        {HOURS.map((hour) => (
          <div className={`hourMarker ${hour === currentHours && currentMinutes < 30 ? 'currentTime' : ''}`} style={{ left: `${hour * HOUR_SCALE}px` }} key={`hourMarker${hour}`}>
            {hour !== HOURS.length - 1 &&
              <Fragment>
                {toStandardTime({ hours: hour })}
              </Fragment>
            }
          </div>
        ))}
      </div>
    </div>
  </div>
));

export default CalendarHeader;
