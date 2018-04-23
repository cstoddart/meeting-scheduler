import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import Logo from '../../assets/images/logo.png';
import './Navigation.css';

@inject(({ store }) => ({
  user: store.user,
  signIng: store.signIn,
  signOut: store.signOut,
}))
@observer
class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <img className="logo" src={Logo} />
        <ul className="navigationMenu">
          <li className="navigationUserName">{this.props.user.name}</li>
          {this.props.user.isSignedIn ?
            <li className="navigationSignOut" onClick={this.props.signOut}>Sign Out</li>
            : <li className="navigationSignIn" onClick={this.props.signIn}>Sign In</li>
          }
        </ul>
      </div>
    );
  }
}

Navigation.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
  }),
  signOut: PropTypes.func,
  signIn: PropTypes.func,
};

export default Navigation;
