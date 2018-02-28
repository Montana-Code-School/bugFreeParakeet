import React, { Component } from 'react';
const pathName = process.env.PATHNAME || 'http://localhost:5000/'
//https://bugfreeparakeet.herokuapp.com/
export default class ScrewyTest extends Component {
  constructor(){
    super();
    this.state={
      story: [],
    };
  }
  componentDidMount(){
    fetch(`${pathName}api/stuff`)
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
