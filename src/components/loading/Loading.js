import React from 'react';
import PropTypes from 'prop-types';

import './Loading.css';

const Loading = (props) => (
  <div className={`loading ${props.active || 'active'}`}>
    <div className="loadingContent">
      <div className="loadingDot" />
      <div className="loadingDot" />
      <div className="loadingDot" />
      <div className="loadingDot" />
      <div className="loadingDot" />
      <div className="loadingDot" />
      <div className="loadingText" />
    </div>
  </div>
);

Loading.propTypes = {
  active: PropTypes.bool,
};

export default Loading;
