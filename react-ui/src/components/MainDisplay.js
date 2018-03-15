import StorySubmit from './Submit.js';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premise:"", //intro premise to be pulled from current api object
      keyValue:"0",
      checker: true,
    };
  }
  //before render pulls data from api
  componentDidMount(e) {
    fetch(`/api/adventure`)
      .then(results => {
        return results.json();
      }).then(data => {
        //loops through array of objects in our database and checks if their key values are
        //equal to this.props.newNewValue which intially is equal to 0, but its value
        //updates whenever a new object is submitted
        for (var i = 0; i < data.length; i++) {
          if (data[i].keyValue == this.props.newNewValue) {
            this.setState({
              keyValue:data[i].keyValue
            });
          }
        }
        let displayText = data.map((adventure) => {
          //loops through array with .map and checks for required key value
          if (adventure.keyValue == this.props.newNewValue) {
            if(adventure.branchEnded == "yes"){
              return(
                <div key={adventure.results}>
                  <p id="premiseText"> {adventure.storyPremise}</p>
                  <p className="mainDisplayOptionText">The End</p>
                  <button onClick={(e) => this.checkResetter(e)}>Back to Start</button>
                </div>
              );
            }else if(adventure.optionTwo == "" && adventure.optionOne !== ""){
              return(
                <div key={adventure.results}>
                  <p id="premiseText"> {adventure.storyPremise}</p>
                  <Link to="/home" id="mainDisplayOptionOne">
                    <p className="mainDisplayOptionText" id="mainDisplayOptionOne" onClick={(e) => this.DoubleCaller(e)}>{adventure.optionOne}</p>
                  </Link>
                  <Link to="/submit" id="mainDisplayAddNewOptionTwo">
                    <p className="mainDisplayOptionText" id="mainDisplayAddNewOptionTwo"  onClick={(e) => this.onClick(e)}> Add New Option </p>
                  </Link>
                </div>
              );
            } else if(adventure.optionOne !== "" && adventure.optionTwo !== ""){
              return(
                <div key={adventure.results}>
                  <p id="premiseText"> {adventure.storyPremise}</p>
                  <div>
                    <Link to="/home" id="mainDisplayOptionOne" className="Links">
                      <p className="mainDisplayOptionText" id="mainDisplayOptionOne"  onClick={(e) => this.DoubleCaller(e)}>{adventure.optionOne}</p>
                    </Link>
                  </div>
                  <Link to="/home" id="mainDisplayOptionTwo">
                    <p className="mainDisplayOptionText" id="mainDisplayOptionTwo"  onClick={(e) => this.DoubleCaller(e)}>{adventure.optionTwo}</p>
                  </Link>
                </div>
              );
            } else if(adventure.optionTwo == "" && adventure.optionOne == ""){
              return(
                <div key={adventure.results}>
                  <p id="premiseText"> {adventure.storyPremise}</p>
                  <Link to="/submit" id="mainDisplayAddNewOptionOne">
                    <p className="mainDisplayOptionText" id="mainDisplayAddNewOptionOne"  onClick={(e) => this.onClick(e)}> Add New Option </p>
                  </Link>
                  <Link to ="/home" id="mainDisplayEndBranch">
                    <p className="mainDisplayOptionText" id="mainDisplayEndBranch" onClick={(e) => this.onClick(e)}> End the Story </p>
                  </Link>
                </div>
              );
            }
          }
        });
        //sets premise equal to jsx for MainDisplay
        this.setState({premise:displayText});
      });
  }
  onClick(e) {
    if (e.target.id == 'mainDisplayAddNewOptionOne') {
      let newKeyValue = this.state.keyValue + "1";
      this.props.getsValueFromMainDisplay(newKeyValue);
    } else if (e.target.id == 'mainDisplayAddNewOptionTwo') {
      let newKeyValue = this.state.keyValue + "2";
      this.props.getsValueFromMainDisplay(newKeyValue);
    } else if (e.target.id == 'mainDisplayOptionTwo') {
      let newKeyValue = this.props.newNewValue + "2";
      this.props.updatesNewValue(newKeyValue);
    } else if (e.target.id == 'mainDisplayOptionOne') {
      let newKeyValue = this.props.newNewValue + "1";
      this.props.updatesNewValue(newKeyValue);
    } else if (e.target.id == 'mainDisplayEndBranch'){
      fetch(`/api/adventure/${this.props.newNewValue}/endBranch`, {
        method: 'PUT',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
        }
      });
      this.setState({checker:false});
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
  }
  BackCaller(e){
    this.goBack(e);
    this.componentDidMount(e);

  }
  checkSetter(e){
    this.setState({checker:true});
    this.componentDidMount(e);
  }
  checkResetter(e){
    this.props.updatesNewValue("0");
    this.setState({checker:true});
    this.componentDidMount(e);
  }
  render () {
    if(this.props.newNewValue === "0"){
      return (
      //renders this.state.premise
        <div>
          {this.state.premise}
        </div>
      );
    }else{
      if(this.state.checker == true){
        return(
          <div>
            {this.state.premise}
            <button onClick={(e) => this.BackCaller(e)}>Back</button>
          </div>
        );
      }else{
        return(
          <div>
            <h1>Story Ended</h1>
            <button onClick={(e) => this.checkSetter(e)}>Back</button>
            <button onClick={(e) => this.checkResetter(e)}>Back to Start</button>
          </div>
        );
      }
    }
  }
}
