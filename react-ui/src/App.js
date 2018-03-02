import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login.js';
import StorySubmit from './components/Submit.js';
import ApiTest from './components/ApiTest';
import ScrewyTest from './components/screwyTest.js';
import MainDisplay from './components/MainDisplay.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
           <Route exact path="/" component={Login} />
           <Route exact path="/home" component={MainDisplay} />
           <Route exact path="/submit" component={StorySubmit} />
        </div>
      </Router>
    );
  }
}
export default App;
