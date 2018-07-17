import React, { Component, Fragment } from 'react';

import { HOUR_SCALE, HOURS } from '../../../constants';
import './GridLines.css';


class GridLines extends Component {
  constructor() {
    super();
    this.state = {
      currentHours: new Date().getHours(),
      currentMinutes: new Date().getMinutes(),
    };
  }

  halfHourTimer = null;

  componentDidMount() {
    this.setCurrentTime();
    this.setTimer();
    window.addEventListener('focus', this.setTimer);
  }

  componentWillUnmount() {
    clearTimeout(this.halfHourTimer);
    window.removeEventListener('focus', this.setTimer);
  }

  setTimer = () => {
    const { currentMinutes } = this.state;
    let interval = 0;
    if (currentMinutes <= 30) { // For minutes between 0 and 30 we need the distance from 30
      interval = (30 - currentMinutes) * 1000 * 60; // converts int to minutes
    } else {
      interval = (60 - currentMinutes) * 1000 * 60;
    }
    this.halfHourTimer = setTimeout(() => this.setCurrentTime(), interval);
  }

  setCurrentTime = () => {
    this.setState({
      currentHours: new Date().getHours(),
      currentMinutes: new Date().getMinutes(),
    });
  }

  render() {
    const { currentHours, currentMinutes } = this.state;
    return (
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
  }
}

export default GridLines;
