import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject(store => ({
  accessToken: store.authStore.accessToken,
  getEvents: store.eventsStore.getEvents,
  events: store.eventsStore.events
}))
@observer
class Calendar extends Component {
  async componentDidMount() {
    console.log("props@calendar", this.props);
    this.props.getEvents(this.props.accessToken);
  }

  render() {
    return (
      <div>
        <h1>Calendar</h1>
        {this.props.accessToken}
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
