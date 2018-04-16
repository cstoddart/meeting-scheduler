import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';
import './Navigation.css';

const Navigation = () => (
  <div className="navigation">
    <img className="logo" src={Logo} />
    <ul className="navigationMenu">
      <li><Link to="/login">Sign In</Link></li>
    </ul>
  </div>
);

export default Navigation;
