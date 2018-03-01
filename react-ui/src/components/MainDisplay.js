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
    fetch(`/api/stuff`)
    .then(results => {
      return results.json();
    }).then(data => {
      let displayText = data.map((stuff) => {
        return(
          <div key={stuff.results}>
            <h1>{stuff.storyPremise}</h1>
            <p onClick={(e) => this.onClick(e)}>{stuff.optionOne}</p>
            <p onClick={(e) => this.onClick(e)}>{stuff.optionTwo}</p>
          </div>
        )
      })
      this.setState({premise:displayText});
    })
  }
  onClick(e) {
    console.log("it works");
  }
  render () {
    return (
      <div>
      {this.state.premise[0]}
      </div>
    )
  }
}
