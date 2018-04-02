import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { googleAuth } from '../../services/googleAuth';
import { observer, inject } from 'mobx-react';

// @inject((stores) => ({
//   setAccessToken: stores.authStore.setAccessToken,
// }))
@inject((stores) => {
  console.log('STORES', stores.authStore);
  return {
    setAccessToken: stores.authStore.setAccessToken,
  };
})
@observer
class Login extends Component {
  handleSignIn = () => {
    console.log('@handleSignIn()...');
    console.log('setAccess', this.props.setAccessToken);
    this.props.setAccessToken();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSignIn}>Sign In</button>
      </div>
    );
  }
}

Login.propTypes = {
  setAccessToken: PropTypes.func,
};

export default withRouter(Login);
