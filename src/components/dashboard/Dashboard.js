import React, { Component } from 'react';
import SignIn from '../signIn/SignIn';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <SignIn />
      </div>
    );
  }
};

export default Dashboard;
