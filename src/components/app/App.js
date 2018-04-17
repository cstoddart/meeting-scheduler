import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';
import Calendar from '../calendar/Calendar';
import Login from '../login/Login';
import '../../utils/reset.css';
import './App.css';

@inject(({ store }) => ({
  signIn: store.signIn,
}))
class App extends Component {
  async componentDidMount() {
    await this.props.signIn();
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

App.propTypes = {
  signIn: PropTypes.func,
};

export default App;
