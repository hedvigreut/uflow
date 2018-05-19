import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/model';
import firebase from 'firebase';


class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      currentUser: null,
      profile_pic: null
    })
  }

  componentDidMount() {
    modelInstance.createApp();
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        modelInstance.setProfilePicture(user.uid);
        this.setState({currentUser: snapshot.val()})
      })
      firebase.database().ref('/images/' + user.uid + '/image').once('value', snapshot => {
        this.setState({profile_pic: snapshot.val()});
      })
    })
  }

  setCurrentUserInModel() {
    modelInstance.currentUser = this.state.currentUser.id;
  }

  render() {
    var currentUser = this.state.currentUser;

    if (currentUser !== null) {
      var username = currentUser.email;
      username = username.substring(0,username.indexOf("@"));
      username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
    }


    return (
      <div className="Signup container">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 jumbotron" id="signup">
          <img className="img-responsive welcomeLogo" src="https://uflow-b640f.firebaseapp.com/static/media/logo.b59931ba.jpg" alt="logo"/>
          <h2>Welcome @{username}!</h2>
          <div id="welcomePhoto">
            <img id="profilePicture" src={this.state.profile_pic} alt="profilePicture" />
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
