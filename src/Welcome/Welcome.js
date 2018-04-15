import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/DinnerModel';

class Welcome extends Component {

  constructor(props) {
    super(props)
  }
    render() {

      return (
        <div className="Welcome">

          <img src={logo} id="logo" alt="logo"/>
          <br/>

          <button onClick={() => modelInstance.googleLogin()}>Sign up with Google</button>

          <p>OR</p>
          <Link to="/explore">
              <button>Log in</button>
          </Link>
        </div>
      );
    }
}

export default Welcome;
