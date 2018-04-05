import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { googleInit } from '../../services/googleInit';

import Navigation from '../navigation/Navigation';
import Dashboard from '../dashboard/Dashboard';
import Calendar from '../calendar/Calendar';
import Login from '../login/Login';

import './App.css';

class App extends Component {
  componentDidMount() {
    googleInit();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />
          <Route exact path="/" component={Dashboard} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/login" component={Login} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
