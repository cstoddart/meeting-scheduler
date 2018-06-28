import React, { Fragment } from 'react';

import { HOUR_SCALE, HOURS } from '../../../constants';
import './GridLines.css';

const GridLines = () => (
  <div className="gridLines">
    <div
      className="gridLine currentTime"
      style={{ left: `${new Date().getHours() * HOUR_SCALE - 2}px` }} // -2 to center 4px border-width
    />
    {HOURS.map((hour) => (
      <Fragment key={`gridLine${hour}`}>
        <div className="gridLine" style={{ left: `${(hour * HOUR_SCALE) - 1}px` }} /> {/* -1 to center 2px border-width */}
        {hour !== HOURS.length - 1 &&
          <div className="gridLine halfHour" style={{ left: `${(hour * HOUR_SCALE) + (HOUR_SCALE / 2)}px` }} /> // no -1 here because this border-width is 1px
        }
      </Fragment>
    ))}
  </div>
);

export default GridLines;
