import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation/Navigation';
import Dashboard from '../dashboard/Dashboard';
import Calendar from '../calendar/Calendar';

import './App.css';

const Home = () => <h1>Home</h1>;

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/calendar" component={Calendar} />
    </div>
  </Router>
);

export default App;
