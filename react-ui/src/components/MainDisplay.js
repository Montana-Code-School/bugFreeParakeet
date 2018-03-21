import StorySubmit from './Submit.js';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import catBackground2 from '../imgs/adventureBeginning.png';
const body = document.querySelector('body');

//displays premises either options or the add new options
//or end branch and gives functionality to the corresponding links
export default class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      premise:"", //intro premise to be pulled from current api object
      keyValue:"0", //equals the id of the obj
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
                  <p id="theEnd" className="theEnd">The End.</p>
                  <button id="toStart" className="button" onClick={(e) => this.checkResetter(e)}>Back to Start</button>
                </div>
              );
            }else if(adventure.optionTwo == "" && adventure.optionOne !== ""){
              return(
                <div key={adventure.results}>
                  <p id="premiseText"> {adventure.storyPremise}</p>
                  <Link to="/home">
                    <button className="button" id="mainDisplayOptionOne" onClick={(e) => this.DoubleCaller(e)}>{adventure.optionOne}</button>
                  </Link>
                  <br />
                  <Link to="/submit">
                    <button className="button" id="mainDisplayAddNewOptionTwo"  onClick={(e) => this.onClick(e)}> Add New Option </button>
                  </Link>
                </div>
              );
            } else if(adventure.optionOne !== "" && adventure.optionTwo !== ""){
              return(
                <div key={adventure.results}>
                  <p id="premiseText"> {adventure.storyPremise}</p>
                  <div>
                    <Link to="/home" className="Links">
                      <button className="button" id="mainDisplayOptionOne"  onClick={(e) => this.DoubleCaller(e)}>{adventure.optionOne}</button>
                    </Link>
                    <br />
                  </div>
                  <Link to="/home">
                    <button className="button" id="mainDisplayOptionTwo"  onClick={(e) => this.DoubleCaller(e)}>{adventure.optionTwo}</button>
                  </Link>
                </div>
              );
            } else if(adventure.optionTwo == "" && adventure.optionOne == ""){
              return(
                <div key={adventure.results}>
                  <p id="premiseText"> {adventure.storyPremise}</p>
                  <Link to="/submit">
                    <button className="button" id="mainDisplayAddNewOptionOne"  onClick={(e) => this.onClick(e)}> Add New Option </button>
                  </Link>
                  <br />
                  <Link to ="/home"s>
                    <button className="button" id="mainDisplayEndBranch" onClick={(e) => this.onClick(e)}> End the Story </button>
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
        method: 'PUT', //checks if end button was clicked
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
        }
      });
      this.setState({checker:false}); //displays story ended
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
  backgroundChanger(e){
    body.style.setProperty('--background', 'url('+catBackground2+') no-repeat center center fixed');
  }
  render () {
    if(this.props.newNewValue.length === 1){
      return (
      //renders this.state.premise
        <div>
          {this.state.premise}
          <Link to="/">
            <button onClick={(e)=>this.backgroundChanger(e)} id="backToStorySelect" className="button">Back to Story Selection </button>
          </Link>

        </div>
      );
    }else{
      if(this.state.checker == true){
        return(
          <div>
            {this.state.premise}
            <button className="button" onClick={(e) => this.BackCaller(e)}>Back</button>
          </div>
        );
      }else{
        return(
          <div>
            <h1 className="header">Story Ended</h1>
            <br />
            <button id="toStart" className="button" onClick={(e) => this.checkResetter(e)}>Back to Start</button>
            <br />
            <button className="button" onClick={(e) => this.checkSetter(e)}>Back</button>
          </div>
        );
      }
    }
  }
}
