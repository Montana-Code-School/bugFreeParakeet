import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import StorySubmit from './components/Submit.js';
import ApiTest from './components/ApiTest';
import ScrewyTest from './components/screwyTest.js';
import MainDisplay from './components/MainDisplay.js';

class App extends Component {
  render() {
    return (
      <div>
        <MainDisplay />
      </div>
    );
  }
}

export default App;
