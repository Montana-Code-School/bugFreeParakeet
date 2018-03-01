import React, { Component } from 'react';


class StorySubmit extends Component {
  constructor(props){
    super(props);
    this.state = {
      optionsBox:"",
      premiseBox:"",
    }
  }
  onClick(e){
    console.log("its working " + this.state.premiseBox + this.state.optionsBox)
  }
  // onClick(e) {
  //   if(e.target.id === "plus"){
  //      this.setState({counter:this.state.counter + 1})
  //     } else if(e.target.id === "minus"){
  //      this.setState({counter:this.state.counter - 1})
  //     }
  //   }
  onChange(e){
    if (e.target.id === "premiseInput") {
     this.setState({premiseBox: e.target.value})
  } else if (e.target.id === "optionInput") {
     this.setState({optionsBox: e.target.value})
  }
}

  render() {
    return (
      <div>
        <h1 className="header" id="submitTitle">Continue the Story</h1>
        <label className="labels">Option Title: </label>
            <input onChange = {(e) => this.onChange(e)} id="optionInput" type="text" />
            <br /><br />
        <label className="labels">Premise: </label>
            <textarea onChange = {(e) => this.onChange(e)} id="premiseInput" rows="10" cols="100"></textarea>
            <br /><br />
        <button onClick={(e) => this.onClick(e)} id="submitButtons" type="button" className="buttons">Submit</button>
      </div>
    );
  }
}

export default StorySubmit;
