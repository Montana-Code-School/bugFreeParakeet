import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <h1 id="welcome" className="header">Welcome to The Unending Story!</h1>
        <Link to="/home">
          <br />
          <h3 id="login" className="links">Login</h3>
        </Link>
        <br />
        <h3 id="signUp" className="links">Sign Up</h3>
      </div>
    );
  }
}

export default Login;
