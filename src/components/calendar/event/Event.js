import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Event = (props) => (
  <Fragment>
    <p>{props.event.summary}</p>
  </Fragment>
);

Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string,
  }),
};

export default Event;
