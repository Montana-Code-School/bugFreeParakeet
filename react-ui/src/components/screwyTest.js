import React, { Component } from 'react';

export default class ScrewyTest extends Component {
  constructor(){
    super();
    this.state={
      story: [],
    };
  }
  componentDidMount(){
    fetch('https://bugfreeparakeet.herokuapp.com/api/stuff')
    .then(results => {
      return results.json();
    }).then(data => {
      let story = data.map((stuff) => {
        return(
          <div key={stuff.results}>
            <h1>{stuff.storyPremise}</h1>
          </div>
        )
      })
      this.setState({story:story});
      console.log("state", this.state.story);
    })
  }
  render(){
    return(
      <div>
        {this.state.story}
      </div>
    )
  }

}
