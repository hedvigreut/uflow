import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/model';
import NavBar from "../Navbar/Navbar";


class Signup extends Component {

  constructor(props) {
    super(props);
  }

    render() {
      //console.log(this.state.currentUser);
      var currentUser = this.props.currentUser;

      if (currentUser !== null) {

        var profile_pic = currentUser.photoURL;
        var fullName = currentUser.displayName;
        var email = currentUser.email;
        var username = currentUser.email;
        username = username.substring(0,username.indexOf("@"));
        username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
        var ID = currentUser.uid;
      }


      return (
          <div className="Signup container">
            {/*<NavBar />*/}
            <div className="col-md-2">
            </div>
            <div className="col-md-8 jumbotron" id="signup">
              <img className="img-responsive welcomeLogo" src={logo} alt="logo"/>
              <h2>Welcome @{username}!</h2>
              <div id="welcomePhoto">
                <img id="profilePicture" src={profile_pic} alt="profilePicture" />
              </div>
              <br></br>

              <Link to="/explore">
                <button className="actionButton" type="submit" value="Continue">Continue</button>
              </Link>
            </div>
          </div>
      );
    }
}

export default Signup;
