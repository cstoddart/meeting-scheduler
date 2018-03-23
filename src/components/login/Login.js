import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as accessTokenActions from '../../actions/accesTokenActions';

class Login extends Component {
  handleSignIn = () => {
    window.gapi.load('client:auth2', {
      callback: () => {
        console.log('PROPS', this.props);
        window.gapi.auth2.authorize({
          client_id: '290258087421-l8cck249qan0k2nbealve3d4q3h1i52g.apps.googleusercontent.com',
          scope: "email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
          response_type: 'id_token permission',
        }, ({ access_token }) => {
          this.props.accessTokenActions.setAccessToken(access_token);
          this.props.history.push("/calendar");
        });
      },
      onerror: () => {
        alert('gapi.client failed to load');
      },
      timeout: 5000,
      ontimeout: () => {
        alert('gapi.client could not load in a timely manner');
      }
    });
  }

  render() {
    return (
      <div>
        <a onClick={() => this.handleSignIn()}>Sign In</a>
      </div>
    )
  };
}

Login.propTypes = {
  accessTokenActions: PropTypes.object,
  accessToken: PropTypes.string
};

function mapStateToProps(state) {
  return {
    accessToken: state.accessToken
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accessTokenActions: bindActionCreators(accessTokenActions, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
