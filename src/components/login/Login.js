import React from 'react';
import { withRouter } from 'react-router-dom';

import { signIn, isSignedIn } from '../../services/googleAuth';
import './Login.css';

class Login extends React.Component {
  async componentDidMount() {
    const signedIn = await isSignedIn();
    console.log('SIGNED IN', signedIn);
  }

  render() {
    return (
      <div className="login">
        <button onClick={signIn}>Sign In</button>
      </div>
    );
  }
}

export default withRouter(Login);
