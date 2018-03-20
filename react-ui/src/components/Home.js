import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      storyVal : "0",
      checker : false,
    };
  }
  storyChooser(e){
    let storyVal = e.target.id;
    this.setState({storyVal: storyVal});
    this.setState({checker:true});
    storyVal = this.state.storyVal;
    console.log(this.state.storyVal);
    this.props.updatesNewValue(storyVal);
  }
  render(){
    if(this.state.checker == false){
      return(
        <div>
          <h1 id="successSub" className="header">Choose Your Adventure!</h1>
          <button className="button" onClick={(e) => this.storyChooser(e)} id="0">The Empire Strikes Cats</button>
          <br />
          <button className="button" onClick={(e) => this.storyChooser(e)} id="1">The Fast and the Fur-ious</button>
          <br />
          <button className="button" onClick={(e) => this.storyChooser(e)} id="2">Lord of the Strings</button>
        </div>
      );
    }else{
      return(
        <div>
          <h1 id="successSub" className="header">Choose Your Adventure</h1>
          <Link to="/home">
            <button className="button" onClick={(e) => this.storyChooser(e)} id="0">The Empire Strikes Cats</button>
          </Link>
          <br />
          <Link to="/home">
            <button className="button" onClick={(e) => this.storyChooser(e)} id="1">The Fast and the Fur-ious</button>
          </Link>
          <br />
          <Link to="/home">
            <button className="button" onClick={(e) => this.storyChooser(e)} id="2">Lord of the Strings</button>
          </Link>
        </div>
      );
    }
  }

}
