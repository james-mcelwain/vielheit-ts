import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Router, browserHistory} from 'react-router';
import routes from './Routes';

class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>{routes}</Router>
  }
}

export default App;
