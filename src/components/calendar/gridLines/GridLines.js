import React, { Fragment } from 'react';

import { hourSize } from '../../../constants';
import { toStandardTime } from '../../../utils';
import './GridLines.css';

const hours = [];
for (let x = 0; x < 24; x++) {
  hours.push(x);
}

const GridLines = () => (
  <div>
    {hours.map((hour) => (
      <Fragment key={hour}>
        <div className="gridLine" style={{ left: `${(hour * hourSize) - 1}px` }}>
          {toStandardTime({ hours: hour })}
        </div>
        <div className="gridLine halfHour" style={{ left: `${(hour * hourSize) + (hourSize / 2)}px` }} />
      </Fragment>
    ))}
  </div>
);

export default GridLines;
