import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import stringShortener from './helper';

class StorySubmit extends Component {
  constructor(props){
    super(props);
    this.state = {
      optionsBox:"", //value to be set equal to user submission in optionsBox
      premiseBox:"", //value to be set equal to user submission in premiseBox
      newValue:"",
      checker:false,
      checker2:true,
    };
  }
  componentDidMount(){
    fetch(`/api/adventure`)
      .then(results => {
        return results.json();
      }).then(data => {
        for(var i = 0; i < data.length; i++){
          if(this.props.keyValue === data[i].keyValue){
            this.setState({checker2:false});
          }
        }
      });
  }
  onSubmit(e){
    if(this.state.optionsBox.length !== 0 && this.state.premiseBox.length !== 0) {
      let ogValue = stringShortener(this.props.keyValue);
      let keyValue = this.props.keyValue;
      this.setState({newValue:keyValue});
      this.props.getsValueFromSubmit(keyValue);
      if(this.state.checker2 === true) {
        fetch('/api/adventure', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify ({
            storyPremise: this.state.premiseBox,
            optionOne: "",
            optionTwo: "",
            keyValue: this.props.keyValue,
          })
        });
        if(this.props.keyValue.endsWith("1") === true){
          fetch(`/api/adventure/keyValue/${ogValue}/${this.state.optionsBox}`, {
            method: 'PUT',
            headers:{
              'Accept': 'application/json',
              'Content-Type':'application/json'
            }
          });
        }else{
          fetch(`/api/adventure/keyValue2/${ogValue}/${this.state.optionsBox}`, {
            method: 'PUT',
            headers:{
              'Accept': 'application/json',
              'Content-Type':'application/json'
            }
          });
        }
      }else{
        let broken = "try again";
      }
      this.setState({checker:true});
    }
  }

  onChange(e){
    if (e.target.id === "premiseInput") {
      this.setState({premiseBox: e.target.value});
    } else if (e.target.id === "optionInput") {
      this.setState({optionsBox: e.target.value});
    }
  }

  render() {
    console.log(this.props.keyValue);
    console.log(this.state.checker2);
    if(this.state.checker === false){
      return (
        <div>
          <h1 className="header" id="submitTitle">Continue the Story...</h1>
          <label className="labels">Option Title: </label>
          <input value= {this.state.optionsBox} onChange = {(e) => this.onChange(e)} id="optionInput" type="text" maxlength="50" />
          <p>Char Limit: 50 Current: {this.state.optionsBox.length}</p>
          <br /><br />
          <label className="labels">Premise: </label>
          <textarea value={this.state.premiseBox} onChange = {(e) => this.onChange(e)} id="premiseInput" rows="10" cols="75" maxlength="1000"></textarea>
          <p>Char Limit: 1000 Current: {this.state.premiseBox.length}</p>
          <br /><br />
          <button onClick={(e) => this.onSubmit(e)} id="submitButton" type="button" className="buttons">Submit</button>
        </div>
      );
    }else if(this.state.checker === true){
      return(
        //submit page for api to catch up
        <div>
          <h1>Successfully Submitted</h1>
          <Link to="/home">
            <button>Continue</button>
          </Link>
        </div>
      );
    }
  }
}

export default StorySubmit;
