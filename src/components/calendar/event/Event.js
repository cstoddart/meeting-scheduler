import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import PropTypes from 'prop-types';

import { HOUR_SCALE } from '../../../constants';
import './Event.css';

@inject(({ store }) => ({
  user: store.user,
}))
@observer
class Event extends Component {
  constructor(props) {
    super(props);
    const { event, user } = props;
    let currentUserEvent = false;
    const currentUserIsOrganizer = event.organizer && event.organizer.email === user.email;
    const currentUserIsAttendee = event.attendees && Object.values(toJS(event.attendees).map((attendee) => attendee.email)).includes(user.email);

    if (currentUserIsOrganizer || currentUserIsAttendee) {
      currentUserEvent = true;
    }

    this.state = {
      width: 0,
      position: 0,
      currentUserEvent,
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
    const position = (hours + (minutes / 60)) * HOUR_SCALE;

    this.setState({
      position,
    });
  }

  calculateWidth() {
    const start = new Date(this.props.event.start.dateTime).getTime();
    const end = new Date(this.props.event.end.dateTime).getTime();
    const duration = (end - start) / 3600000;
    const width = duration * HOUR_SCALE;

    this.setState({
      width,
    });
  }

  render() {
    const { event } = this.props;
    return (
      <div
        className={`event ${this.state.currentUserEvent ? 'active' : ''}`}
        style={{
          minWidth: `${this.state.width}px`,
          maxWidth: `${this.state.width}px`,
          left: `${this.state.position}px`,
          zIndex: 500 - this.props.index, // z-index decreases from left to right
        }}
        data-width={this.state.width}
        data-position={this.state.position}
        onClick={() => this.props.selectEvent(event.id)}
      >
        <div className="eventContent">
          <p className="eventTitle">{event.summary}</p>
          <p className="eventCreator">{event.creator && event.creator.displayName || event.creator && event.creator.email}</p>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape({
    start: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    end: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    creator: PropTypes.shape({
      displayName: PropTypes.string, // eslint-disable-line
      email: PropTypes.string.isRequired, // eslint-disable-line
    }),
  }),
  selectEvent: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Event;
