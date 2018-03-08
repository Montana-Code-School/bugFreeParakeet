import StorySubmit from './Submit.js';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MainDisplay extends Component {
  constructor(props) {
  super(props);
  this.state = {
    premise:"", //intro premise to be pulled from current api object
    keyValue:"0",
    backButton:"",
  };
  }
  //before render pulls data from api
  componentDidMount(e) {
    fetch(`/api/stuff`)
    .then(results => {
      return results.json();
    }).then(data => {
//loops through array of objects in our database and checks if their key values are
//equal to this.props.newValue which intially is equal to 0, but its value
//updates whenever a new object is submitted
      for (var i = 0; i < data.length; i++) {
        if (data[i].keyValue == this.props.newNewValue) {
          this.setState({
            keyValue:data[i].keyValue
          });
        }
      }
      let displayText = data.map((stuff) => {
  //loops through array with .map and checks for required key value
        if (stuff.keyValue == this.props.newNewValue) {
          if(stuff.optionTwo == "" && stuff.optionOne !== ""){
            return(
              <div key={stuff.results}>
                <p id="premiseText"> {stuff.storyPremise}</p>
                <Link to="/home">
                  <p className="mainDisplayOptionText" id="mainDisplayOptionOne" onClick={(e) => this.DoubleCaller(e)}>{stuff.optionOne}</p>
                </Link>
                <Link to="/submit">
                  <p className="mainDisplayOptionText" id="mainDisplayAddNewOptionTwo" onClick={(e) => this.onClick(e)}> Add New Option </p>
                </Link>
              </div>
            )
          } else if(stuff.optionOne !== "" && stuff.optionTwo !== ""){
              return(
                <div key={stuff.results}>
                  <p id="premiseText"> {stuff.storyPremise}</p>
                  <Link to="/home">
                    <p className="mainDisplayOptionText" id="mainDisplayOptionOne" onClick={(e) => this.DoubleCaller(e)}>{stuff.optionOne}</p>
                  </Link>
                  <Link to="/home">
                    <p className="mainDisplayOptionText" id="mainDisplayOptionTwo" onClick={(e) => this.DoubleCaller(e)}>{stuff.optionTwo}</p>
                  </Link>
                </div>
              )
          } else if(stuff.optionTwo == "" && stuff.optionOne == ""){
            return(
              <div key={stuff.results}>
              <p id="premiseText"> {stuff.storyPremise}</p>
              <Link to="/submit">
                <p className="mainDisplayOptionText" id="mainDisplayAddNewOptionOne" onClick={(e) => this.onClick(e)}> Add New Option </p>
              </Link>
              </div>
            )

          }
        }
      })
    //sets premise equal to jsx for MainDisplay
      this.setState({premise:displayText});
    })
  }
  onClick(e) {
    if (e.target.id == 'mainDisplayAddNewOptionOne') {
      let hiEd = this.state.keyValue + "1";
      this.props.getsValueFromMainDisplay(hiEd);
    } else if (e.target.id == 'mainDisplayAddNewOptionTwo') {
      let hiAustin = this.state.keyValue + "2";
      this.props.getsValueFromMainDisplay(hiAustin);
    } else if (e.target.id == 'mainDisplayOptionTwo') {
      console.log("option two works");
      let blahblipity = this.props.newNewValue + "2";
      this.props.updatesNewValue(blahblipity);
    } else if (e.target.id == 'mainDisplayOptionOne') {
      console.log("option one works");
      let blipityblah = this.props.newNewValue + "1";
      this.props.updatesNewValue(blipityblah);
    }
  }
  DoubleCaller(e){
    this.onClick(e);
    this.componentDidMount(e);
  }
  goBack(e) {
    var arr = this.props.newNewValue.split("");
    arr.pop();
    let backValue = arr.join("");
    this.props.updatesNewValue(backValue);
    console.log(backValue);
  }
  BackCaller(e){
    this.goBack(e);
    this.componentDidMount(e);
  }
  render () {
    console.log(this.state.premise);
    console.log(this.state.backButton);
    if(this.props.newNewValue === "0"){
      return (
      //renders this.state.premise
        <div>
          {this.state.premise}
        </div>
      )
    }else{
      return(
      <div>
        {this.state.premise}
        <button onClick={(e) => this.BackCaller(e)}>Back</button>
      </div>
    )
    }
  }
}
