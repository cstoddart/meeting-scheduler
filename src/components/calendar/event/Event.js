import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hourSize } from '../../../constants';
import './Event.css';

class Event extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      position: 0,
    };
  }
  componentDidMount() {
    this.calculatePosition();
    this.calculateWidth();
  }

  calculatePosition() {
    const start = new Date(this.props.event.start.dateTime);
    const hours = start.getHours();
    const minutes = start.getMinutes();
    const position = (hours + (minutes / 60)) * hourSize;

    this.setState({
      position,
    });
  }

  calculateWidth() {
    const start = new Date(this.props.event.start.dateTime).getTime();
    const end = new Date(this.props.event.end.dateTime).getTime();
    const duration = (end - start) / 3600000;
    const width = duration * hourSize;

    this.setState({
      width,
    });
  }

  render() {
    return (
      <div
        className="event"
        style={{
          minWidth: `${this.state.width}px`,
          maxWidth: `${this.state.width}px`,
          left: `${this.state.position}px`,
        }}
        data-width={this.state.width}
        data-position={this.state.position}
      >
        <div className="eventContent">
          <p>{this.props.event.summary}</p>
          <p className="eventCreator">{this.props.event.creator.displayName || this.props.event.creator.email}</p>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string,
    start: PropTypes.shape({
      dateTime: PropTypes.string,
    }),
    end: PropTypes.shape({
      dateTime: PropTypes.string,
    }),
  }),
};

export default Event;
