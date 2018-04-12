import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => (
  <ul className="navigation">
    <li><Link to="/">Dashboard</Link></li>
    <li><Link to="/calendar">Calendar</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
);

export default Navigation;
