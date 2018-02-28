import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import StorySubmit from './components/Submit.js';
import ApiTest from './components/ApiTest';
import ScrewyTest from './components/screwyTest.js';

class App extends Component {
  render() {
    return (
      <div>
        <StorySubmit />
        <ApiTest />
        <ScrewyTest />
      </div>
    );
  }
}

export default App;
