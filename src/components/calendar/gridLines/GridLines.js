import React, { Fragment } from 'react';

import { HOUR_SCALE, HOURS } from '../../../constants';
import './GridLines.css';

const currentHours = new Date().getHours();
const currentMinutes = new Date().getMinutes();

const GridLines = () => (
  <div className="gridLines">
    {HOURS.map((hour) => (
      <Fragment key={`gridLine${hour}`}>
        <div className={`gridLine ${hour === currentHours && currentMinutes < 30 ? 'currentTime' : ''}`} style={{ left: `${(hour * HOUR_SCALE) - 1}px` }} /> {/* -1 to center 2px border-width */}
        {hour !== HOURS.length - 1 &&
          <div className={`gridLine halfHour ${hour === currentHours && currentMinutes >= 30 ? 'currentTime' : ''}`} style={{ left: `${(hour * HOUR_SCALE) + (HOUR_SCALE / 2)}px` }} /> // no -1 here because this border-width is 1px
        }
      </Fragment>
    ))}
  </div>
);

export default GridLines;
