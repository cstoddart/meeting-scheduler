import React, { Component } from 'react';
import { googleSignIn } from '../../auth';

class SignIn extends Component {
  async signIn() {
    const { credential: { accessToken } } = await googleSignIn();
    console.log('ACCESS TOKEN', accessToken);
  }

  render() {
    return (
      <div>
        <a onClick={this.signIn}>Sign In</a>
      </div>
    )
  };
}

export default SignIn;
