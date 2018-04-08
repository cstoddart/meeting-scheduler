import React, { Component } from 'react';

import './GridLines.css';

const hours = [];
for (let x = 0; x < 24; x++) {
  hours.push(x);
}

class GridLines extends Component {
  calculatePosition(hour) {
    const position = hour * 250;
  }

  render() {
    return (
      <React.Fragment>
        {hours.map((hour, index) => (
          <div className="gridLine" style={{ left: `${hour * 250}px` }}>
            {index}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default GridLines;
