import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as mobxTypes } from 'mobx-react';

import Event from '../event/Event';

const Row = (props) => (
  <Fragment>
    <h2>{props.room.name}</h2>
    {props.room.items.map((event) => (
      <Event key={event.id} event={event} />
    ))}
  </Fragment>
);

Row.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
    items: mobxTypes.observableArray,
  }),
};

export default Row;
