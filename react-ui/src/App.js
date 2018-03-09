import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login.js';
import StorySubmit from './components/Submit.js';
import ApiTest from './components/ApiTest';
import MainDisplay from './components/MainDisplay.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyValue: "failed",
      newValue: "0",
    };
    this.getsValueFromMainDisplay = this.getsValueFromMainDisplay.bind(this);
    this.getsValueFromSubmit = this.getsValueFromSubmit.bind(this);
    this.updatesNewValue = this.updatesNewValue.bind(this);
  }
  //declares function to be passed as props to get value from child.
  //sets keyValue equal to the passed value which determines what part of the story tree to render
  getsValueFromMainDisplay(value){
    this.setState({keyValue:value});
  }
  //declares second callback function that also takes value as
  // its argument as that is what it is looking for, from submit.
  getsValueFromSubmit(value){
    this.setState({newValue:value});
  }
  //displays new part of the story when user in mainDisplay clicks on an option
  updatesNewValue(value){
    this.setState({newValue:value});
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/home/" render={(props)=>(
            <MainDisplay updatesNewValue={this.updatesNewValue} newNewValue={this.state.newValue} getsValueFromMainDisplay={this.getsValueFromMainDisplay}/>
          )} />
          <Route exact path="/submit" render={(props)=>(
            <StorySubmit keyValue={this.state.keyValue} getsValueFromSubmit={this.getsValueFromSubmit} />
          )} />
        </div>
      </Router>
    );
  }
}
export default App;
