import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { googleAuth } from '../../services/googleAuth';
class Login extends Component {
  handleSignIn = async () => {
    googleAuth(() => console.log("Signing in..."));
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
