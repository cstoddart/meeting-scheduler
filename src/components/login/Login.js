import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject(store => ({
  accessToken: store.authStore.accessToken,
  setAccessToken: store.authStore.setAccessToken
}))
@observer
class Login extends Component {
  handleSignIn = async () => {
    console.log("PROPS@LOGIN", this.props);

    this.props.setAccessToken();

    console.log('accessToken', this.props.accessToken);
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
