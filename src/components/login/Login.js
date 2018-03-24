import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/authActions';

class Login extends Component {
  handleSignIn = () => {
    this.props.authActions.authorizeUser();
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
  accessToken: PropTypes.string,
};

export default withRouter(Login);
