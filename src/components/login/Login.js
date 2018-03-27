import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { googleAuth } from '../../services/googleAuth';
class Login extends Component {
  handleSignIn = async () => {
    googleAuth(() => console.log('Signing in...'));
  }

  render() {
    return (
      <div>
        <a onClick={() => this.handleSignIn()}>Sign In</a>
      </div>
    );
  }
}

export default withRouter(Login);
