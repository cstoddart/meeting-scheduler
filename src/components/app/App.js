import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { googleInit } from '../../services/googleInit';
import Navigation from '../navigation/Navigation';
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
        <Fragment>
          <Navigation />
          <Route exact path="/" component={Calendar} />
          <Route exact path="/login" component={Login} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
