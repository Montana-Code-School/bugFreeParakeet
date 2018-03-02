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
    }
  }
  //before render pulls data from api
  componentDidMount() {
    fetch(`/api/stuff`)
    .then(results => {
      return results.json();
    }).then(data => {
      let displayText = data.map((stuff) => {
  //loops through array with .map and checks for req key value
        if (stuff.keyValue == 0) {

        return(
          <div key={stuff.results}>
            <p id="premiseText"> {stuff.storyPremise}</p>
            <Link to="/submit">
              <p className="mainDisplayOptionText" id="mainDisplayOptionOne"> Add New Option </p>
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
  //get rid of me
  onClick(e) {
    if (e.target.id == 'mainDisplayOptionOne') {
      console.log("option one works")
    } else if (e.target.id == 'mainDisplayOptionTwo') {
      console.log("option two works")
    }
  }
  //stop getting rid of me
  render () {
    return (
      //renders this.state.premise
      <div>
      {this.state.premise}
      </div>
    )
  }
}
