import React, { Fragment } from 'react';

import { HOUR_SCALE, HOURS } from '../../../constants';
import './GridLines.css';

const GridLines = () => (
  <div className="gridLines">
    {HOURS.map((hour) => (
      <Fragment key={`gridLine${hour}`}>
        <div className="gridLine" style={{ left: `${(hour * HOUR_SCALE) - 1}px` }} />
        {hour !== HOURS.length - 1 &&
          <div className="gridLine halfHour" style={{ left: `${(hour * HOUR_SCALE) + (HOUR_SCALE / 2)}px` }} />
        }
      </Fragment>
    ))}
  </div>
);

export default GridLines;
