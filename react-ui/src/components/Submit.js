import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import stringShortener from './helper';

class StorySubmit extends Component {
  constructor(props){
    super(props);
    this.state = {
      optionsBox:"",//value to be set equal to user submission in optionsBox aka Options Title area
      premiseBox:"",//value to be set equal to user submission in premiseBox aka premise area
      checker:false,//when set to true, displays the Successfully submitted page
      checker2:true,//stops multiple submissions for the same option
    };
    this.submitAuth = this.submitAuth.bind(this);
  }
  submitAuth() {
    //checks to see if submission has already been submitted
    fetch(`/api/adventure`) //fetches from api
      .then(results => { //the results of the fetch
        return results.json(); //turns results into json
      }).then(data => { //calls the json the 'data'
        for(var i = 0; i < data.length; i++){ //loops through the data array
          if(this.props.keyValue === data[i].keyValue){ // checks to see if
            //current submission has already been submitted
            this.setState({checker2:false}); //blocks from submitting
          }
        }
      });
      return true;
  }
  componentDidMount(){
    //checks to see if submission has already been submitted
    fetch(`/api/adventure`) //fetches from api
      .then(results => { //the results of the fetch
        return results.json(); //turns results into json
      }).then(data => { //calls the json the 'data'
        for(var i = 0; i < data.length; i++){ //loops through the data array
          if(this.props.keyValue === data[i].keyValue){ // checks to see if
            //current submission has already been submitted
            this.setState({checker2:false}); //blocks from submitting
          }
        }
      });
  }
  onSubmit(e){ //function for submit button
    let self = this;
    function poster() {
      if(self.state.optionsBox.length !== 0 && self.state.premiseBox.length !== 0 && self.state.optionsBox[0] !== " " && self.state.premiseBox[0] !== " ") {
        //if theres text in optionsBox and premiseBox then continue
        let ogValue = stringShortener(self.props.keyValue);
        //stringShortener brought in from helper.js
        let keyValue = self.props.keyValue;
        self.props.getsValueFromSubmit(keyValue);//this.props.keyValue comes from mainDisplay
        //and determines what new page will be displayed
        if(self.state.checker2 === true) {
          fetch('/api/adventure', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
              storyPremise: self.state.premiseBox, //user submitted premise
              optionOne: "", //link for option one, starts empty
              optionTwo: "", //link for option two, starts empty
              keyValue: self.props.keyValue, //posts updated keyValue from mainDisplay
            })
          });
          if(self.props.keyValue.endsWith("1") === true){
            //writes new option one
            fetch(`/api/adventure/keyValue/${ogValue}/${self.state.optionsBox}`, {
              method: 'PUT',
              headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
              }
            });
          }else{ //writes new option two
            fetch(`/api/adventure/keyValue2/${ogValue}/${self.state.optionsBox}`, {
              method: 'PUT',
              headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
              }
            });
          }
        }
        self.setState({checker:true}); //displays Successfully submitted when true
      }
    }
    async function doEverything() {
      await self.submitAuth();
      await poster();
    }
    doEverything();
  }

  onChange(e){ //stores user input from text boxes
    if (e.target.id === "premiseInput") {
      this.setState({premiseBox: e.target.value});
    } else if (e.target.id === "optionInput") {
      this.setState({optionsBox: e.target.value});
    }
  }

  render() {
    if(this.state.checker === false){
      return (
        <div>
          <h1 className="header" id="submitTitle">Continue the Story...</h1>
          <label className="labels">Option Title: </label>
          <input value= {this.state.optionsBox} onChange = {(e) => this.onChange(e)} id="optionInput" type="text" maxlength="50" />
          <p className="count">Character Limit: 50 Current: {this.state.optionsBox.length}</p>
          <br />
          <label className="labels">Premise: </label>
          <textarea value={this.state.premiseBox} onChange = {(e) => this.onChange(e)} id="premiseInput" rows="10" cols="75" maxlength="1000"></textarea>
          <p className="count">Character Limit: 1000 Current: {this.state.premiseBox.length}</p>
          <br />
          <button onClick={(e) => this.onSubmit(e)} id="submitButton" type="button" className="buttons">Submit</button>
        </div>
      );
    }else if(this.state.checker === true){
      return(
        //submit page for api to catch up
        <div>
          <h1 className="header">Successfully Submitted</h1>
          <Link to="/home">
            <button className="buttons">Continue</button>
          </Link>
        </div>
      );
    }
  }
}

export default StorySubmit;
