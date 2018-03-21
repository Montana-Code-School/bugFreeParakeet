import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//the start page, where the fun begins
//later could be a login/auth page
class Login extends Component {
  render() {
    return (
      <div>
        <h1 id="welcome" className="header">Welcome to The Unending Story!</h1>
        <Link to="/test">
          <br />
          <h3 id="login" className="button">Start</h3>
        </Link>
      </div>
    );
  }
}

export default Login;
