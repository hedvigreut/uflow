import React, { Component } from 'react';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/model';

class Welcome extends Component {

  render() {

    return (
      <div className="Welcome">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 jumbotron">
          <div id="welcome">
            <img className="img-responsive welcomeLogo" src="https://uflow-b640f.firebaseapp.com/static/media/logo.b59931ba.jpg" alt="logo"/>
            <br/>

            <button id="logInButton" onClick={() => modelInstance.googleLogin()}>Log in with Google</button>

          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
