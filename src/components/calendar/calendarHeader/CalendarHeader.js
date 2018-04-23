import React, { Fragment, forwardRef } from 'react';

import { toStandardTime } from '../../../utils';
import { hourScale, hours } from '../../../constants';
import './CalendarHeader.css';

const CalendarHeader = forwardRef((props, ref) => (
  <div className="calendarHeader" ref={ref}>
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
));

export default CalendarHeader;
