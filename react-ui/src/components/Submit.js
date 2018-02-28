import React, { Component } from 'react';


class StorySubmit extends Component {

  render() {
    return (
      <div>
        <h1 className="header" id="submitTitle">Continue the Story</h1>
        <label className="labels">Option: </label>
            <input id="optionInput" type="text" />
            <br /><br />
        <label className="labels">Premise: </label>
            <textarea  id="premiseInput" rows="10" cols="100"></textarea>
            <br /><br />
        <button id="submitButtons" type="button" className="buttons">Submit</button>
      </div>
    );
  }
}

export default StorySubmit;
