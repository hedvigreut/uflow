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
          <div className="col-md-4">
          </div>
          <div className="col-md-3">
            <img src={logo} id="logo" alt="logo"/>
            <br/>

            <button onClick={() => modelInstance.googleLogin()}>Sign up with Google</button>

            <p>OR</p>
            <Link to="/explore">
                <button>Log in</button>
            </Link>
          </div>
        </div>
      );
    }
}

export default Welcome;
