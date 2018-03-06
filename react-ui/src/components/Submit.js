import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class StorySubmit extends Component {
  constructor(props){
    super(props);
    this.state = {
      optionsBox:"", //value to be set equal to user submission in optionsBox
      premiseBox:"", //value to be set equal to user submission in premiseBox
      newValue:"",
      checker:false,
    }
    // let variable = previousOption = keyValueofpreviousOption;
  }
//naming things is hard
  onClick(e){
    let bleh = this.props.keyValue + "1";
    this.setState({newValue:bleh});
    this.props.getsValueFromSubmit(bleh);
    fetch('/api/stuff', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        storyPremise: this.state.premiseBox,
        optionOne: this.state.optionsBox,
        keyValue: this.props.keyValue + "1",
      })
    })
    this.setState({
      premiseBox: "",
      optionsBox: "",
    })
    this.setState({checker:true});
  }


  onChange(e){
    if (e.target.id === "premiseInput") {
     this.setState({premiseBox: e.target.value})
  } else if (e.target.id === "optionInput") {
     this.setState({optionsBox: e.target.value})
  }
}

  render() {
    console.log(this.props.keyValue);
    if(this.state.checker === false){
    return (
      <div>
        <h1 className="header" id="submitTitle">Continue the Story...</h1>
        <label className="labels">Option Title: </label>
            <input value= {this.state.optionsBox} onChange = {(e) => this.onChange(e)} id="optionInput" type="text" />
            <br /><br />
          <label className="labels">Premise: </label>
            <textarea value={this.state.premiseBox} onChange = {(e) => this.onChange(e)} id="premiseInput" rows="10" cols="75"></textarea>
            <br /><br />
            <button onClick={(e) => this.onClick(e)} id="submitButtons" type="button" className="buttons">Submit</button>
      </div>
    );
  }else if(this.state.checker === true){
    return(
      <div>
        <h1>Successfully Submitted</h1>
        <Link to="/home">
        <button>Continue</button>
        </Link>
      </div>
    )
  }
  }
}

export default StorySubmit;
