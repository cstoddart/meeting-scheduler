import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class Calendar extends Component {
  render() {
    return (
      <div>
        <div id="firebaseui-auth-container"></div>
        <h1>Calendar</h1>
        {this.props.accessToken}
      </div>
    )
  }
}

Calendar.propTypes = {
  accessToken: PropTypes.string
}

function mapStateToProps(state) {
  return {
    accessToken: state.accessToken
  };
}

export default connect(
  mapStateToProps
)(Calendar);
