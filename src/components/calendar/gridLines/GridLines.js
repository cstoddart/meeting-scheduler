import React, { Fragment } from 'react';

import { hourSize, hours } from '../../../constants';
import './GridLines.css';

const GridLines = () => (
  <div className="gridLines">
    {hours.map((hour) => (
      <Fragment key={`gridLine${hour}`}>
        <div className="gridLine" style={{ left: `${(hour * hourSize) - 1}px` }} />
        {hour !== hours.length - 1 &&
          <div className="gridLine halfHour" style={{ left: `${(hour * hourSize) + (hourSize / 2)}px` }} />
        }
      </Fragment>
    ))}
  </div>
);

export default GridLines;
