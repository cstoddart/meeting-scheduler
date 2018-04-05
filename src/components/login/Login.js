import React from 'react';
import { withRouter } from 'react-router-dom';

import { signIn, isSignedIn } from '../../services/googleAuth';

class Login extends React.Component {
  async componentDidMount() {
    const signedIn = await isSignedIn();
    console.log(signedIn);
  }

  render() {
    return (
      <button onClick={signIn}>Sign In</button>
    );
  }
}

export default withRouter(Login);
