import StorySubmit from './Submit.js';
import React, { Component } from 'react';

export default class MainDisplay extends Component {
  constructor(props) {
  super(props);
  this.state = {
    premise:"",
    option1:"",
    option2:"",
    }
  }
  componentDidMount() {
    let space = "    ";
    fetch(`/api/stuff`)
    .then(results => {
      return results.json();
    }).then(data => {
      let displayText = data.map((stuff) => {
        return(
          <div key={stuff.results}>
            <p id="premiseText"> {stuff.storyPremise}</p>
            <p className="mainDisplayOptionText" id="mainDisplayOptionOne" onClick={(e) => this.onClick(e)}>{stuff.optionOne}</p>
            <p className="mainDisplayOptionText" id="mainDisplayOptionTwo" onClick={(e) => this.onClick(e)}>{stuff.optionTwo}</p>
          </div>
        )
      })
      this.setState({premise:displayText});
    })
  }
  onClick(e) {
    if (e.target.id == 'mainDisplayOptionOne') {
      console.log("option one works")
    } else if (e.target.id == 'mainDisplayOptionTwo') {
      console.log("option two works")
    }
  }
  render () {
    return (
      <div>
      {this.state.premise[0]}
      </div>
    )
  }
}
