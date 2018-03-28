import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject(({ eventsStore }) => ({
  getEvents: eventsStore.getEvents,
  events: eventsStore.events,
}))
@observer
class Calendar extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <div>
        <h1>Calendar</h1>
        {this.props.events.map((event) => (
          <div>
            {event.summary}
          </div>
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  getEvents: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.object),
};

export default Calendar;
