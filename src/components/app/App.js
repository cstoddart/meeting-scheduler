import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation/Navigation';
import Dashboard from '../dashboard/Dashboard';

import './App.css';

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

export default App;
