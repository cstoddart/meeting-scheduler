import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <ul>
    <li><Link to="/">Dashboard</Link></li>
    <li><Link to="/calendar">Calendar</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
);

export default Navigation;
