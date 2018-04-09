import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { googleInit } from '../../services/googleInit';
import Navigation from '../navigation/Navigation';
import Dashboard from '../dashboard/Dashboard';
import Calendar from '../calendar/Calendar';
import Login from '../login/Login';
import '../../utils/reset.css';
import './App.css';

class App extends Component {
  async componentDidMount() {
    await googleInit();
  }

  render() {
    return (
      <Router>
        <div className="pageContainer">
          <Navigation />
          <div className="mainContent">
            <Route exact path="/" component={Dashboard} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
