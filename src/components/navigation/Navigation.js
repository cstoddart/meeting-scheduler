import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../../services/googleAuth';
import Logo from '../../assets/images/logo.png';
import './Navigation.css';

class Navigation extends Component {
  async componentDidMount() {
    const user = await getUser();
    console.log('USER', user);
  }

  render() {
    return (
      <div className="navigation">
        <img className="logo" src={Logo} />
        <ul className="navigationMenu">
          <li><Link to="/login">Sign In</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
