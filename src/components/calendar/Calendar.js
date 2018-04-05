import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Row from './row/Row';

@inject(({ store }) => ({
  getEvents: store.getEvents,
  events: store.events,
}))
@observer
class Calendar extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <Fragment>
        <h1>Calendar</h1>
        {this.props.events && this.props.events.map((room) => (
          <Row key={room.name} room={room} />
        ))}
      </Fragment>
    );
  }
}

Calendar.propTypes = {
  getEvents: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.object),
};

export default Calendar;
