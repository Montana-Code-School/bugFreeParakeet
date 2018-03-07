import StorySubmit from './Submit.js';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MainDisplay extends Component {
  constructor(props) {
  super(props);
  this.state = {
    premise:"", //intro premise to be pulled from current api object
    option1:"", //option one pulled from subsequent api object || add new option links to submit
    option2:"", //option two pulled from subsequent api object || end branch
    keyValue:"0",
  };
  }
  //before render pulls data from api
  componentDidMount() {
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

        return(
          <div key={stuff.results}>
            <p id="premiseText"> {stuff.storyPremise}</p>
            <Link to="/submit">
              <p className="mainDisplayOptionText" id="mainDisplayOptionOne" onClick={(e) => this.onClick(e)}> Add New Option </p>
            </Link>
            <p className="mainDisplayOptionText" id="mainDisplayOptionTwo" onClick={(e) => this.onClick(e)}>{stuff.optionTwo}</p>
          </div>
        )
      }
      })
    //sets premise equal to jsx for MainDisplay
      this.setState({premise:displayText});
    })
  }
  onClick(e) {
    if (e.target.id == 'mainDisplayOptionOne') {
      // let work = this.state.keyValue;
      this.props.getsValueFromMainDisplay(this.state.keyValue)
    } else if (e.target.id == 'mainDisplayOptionTwo') {
      console.log("option two works");
      console.log("the state is " + this.state.keyValue);
    }
  }
  render () {
    console.log(this.props.newNewValue);
    return (
      //renders this.state.premise
      <div>
      {this.state.premise}
      </div>
    )
  }
}
