import React, { Component, Fragment, forwardRef } from 'react';

import { toStandardTime } from '../../../utils';
import { HOUR_SCALE, HOURS } from '../../../constants';
import './CalendarHeader.css';

class CalendarHeaderContent extends Component {
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
      <div className="calendarHeaderContent" onScroll={this.props.matchScroll} onMouseEnter={() => this.props.toggleMouseOnHeader(true)} onMouseLeave={() => this.props.toggleMouseOnHeader(false)}>
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
    );
  }
}

const CalendarHeader = forwardRef((props, ref) => (
  <div className="calendarHeader" ref={ref}>
    <CalendarHeaderContent matchScroll={props.matchScroll} toggleMouseOnHeader={props.toggleMouseOnHeader} />
  </div>
));

export default CalendarHeader;
