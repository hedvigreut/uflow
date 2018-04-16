import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/model';
import NavBar from "../Navbar/Navbar";

class Welcome extends Component {

  constructor(props) {
    super(props)
  }
    render() {

      return (
        <div className="Welcome">
          {/*<NavBar/>*/}
          <div className="col-md-2">
          </div>
          <div className="col-md-8 jumbotron">
            <div id="welcome">
              <img className="img-responsive welcomeLogo" src={logo} alt="logo"/>
              <br/>

              <button className="actionButton" onClick={() => modelInstance.googleLogin()}>Sign up with Google</button>

              <p id="or">OR</p>
              <Link to="/explore">
                  <button className="actionButton">Log in</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
}

export default Welcome;
