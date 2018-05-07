import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import { modelInstance } from '../data/model';
import NavBar from "../Navbar/Navbar";


class Signup extends Component {

  constructor(props) {
    super(props);
      this.state = {

      };


    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeProfilePic = this.handleChangeProfilePic.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
  }

  handleChangeName(event) {
    this.setState({fullName: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangeProfilePic(event) {
    this.setState({profile_pic: event.target.value});
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

    render() {

      var currentUser = this.props.currentUser;

      if (currentUser !== null) {
        var profile_picture = currentUser.photoURL;
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
              <img id="profilePicture" src={profile_picture} alt="profilePicture"/>
              <form onSubmit={this.handleSubmit}>
              <h4>Do you want to change your profile picture?</h4>
              <div id="uploadImage">
                <input type="file" id="file" name="file" onChange={modelInstance.handleFileSelect, this.handleChangeProfilePic}/>
              </div>
              <br></br>
              <h4>Full name: <input id="fullName" type="text" value={fullName} onChange={this.handleChangeName}/></h4>
              <br></br>

              <h4>Email: <input id="enterEmail" type="text" value={email} onChange={this.handleChangeEmail}/></h4>

              <br></br>

              <h4>Username: <input id="enterUsername" type="text" value={username} onChange={this.handleChangeUsername}/></h4>

              <br></br>
              {/*}<h3>Password: <input type="text" placeholder="Ex hello123"/></h3>
            <br></br>*/}
            </form>

              <Link to="/explore">
                <button className="actionButton" type="submit" value="Continue" onClick={modelInstance.writeUserData(this.state.email, {ID}, this.state.profile_pic, this.state.username, this.state.fullName)}></button>
              </Link>
            </div>
          </div>
      );
    }
}

export default Signup;
