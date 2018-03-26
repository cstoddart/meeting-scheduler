import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject(store => ({
  getEvents: store.eventsStore.getEvents,
  events: store.eventsStore.events
}))
@observer
class Calendar extends Component {
  async componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <div>
        <h1>Calendar</h1>
        {this.props.events.map(event => (
          <div>
            {event.summary}
          </div>
        ))}
      </div>
    )
  }
}

Calendar.propTypes = {
  accessToken: PropTypes.string
}

export default Calendar;
