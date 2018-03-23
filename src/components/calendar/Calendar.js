import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class Calendar extends Component {
  async componentDidMount() {
    console.log('MOUNTING...');
    await window.gapi.client.request({
      path: 'https://content.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyB3DyA_gJJn94MlsHdxoALORleuDNagzD0',
      headers: {
        authorization: `Bearer ${this.props.accessToken}`
      }
    });
  }

  render() {
    return (
      <div>
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
