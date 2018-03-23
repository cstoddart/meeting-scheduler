import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/calendar">Calendar</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </div>
);

export default Navigation;
