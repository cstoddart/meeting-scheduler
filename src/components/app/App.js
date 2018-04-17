import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';

// import { googleInit } from '../../services/googleInit';
import Navigation from '../navigation/Navigation';
import Calendar from '../calendar/Calendar';
import Login from '../login/Login';
import '../../utils/reset.css';
import './App.css';

@inject(({ store }) => ({
  googleInit: store.googleInit,
}))
class App extends Component {
  async componentDidMount() {
    await this.props.googleInit();
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
  googleInit: PropTypes.func,
};

export default App;
