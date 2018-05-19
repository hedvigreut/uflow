import React, { Component } from 'react';
import firebase from 'firebase';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/model';
import Explore from "./Explore/Explore";
import Profile from "./Profile/Profile";
import OtherProfile from "./Profile/OtherProfile";
import Signup from "./Signup/Signup";
import FriendFlow from './FriendFlow/FriendFlow';
import Chat from './Chat/Chat';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'U-flow',
      currentUser: null,
    }
  }

  componentDidMount() {
    // Initialize Firebase
    modelInstance.createApp();

    firebase.auth().onAuthStateChanged(currentUser => {
      currentUser
      ? this.setState(() => ({ currentUser }))
      : this.setState(() => ({ currentUser: null }));
      modelInstance.writeUserData(currentUser.email, currentUser.uid, currentUser.photoURL, currentUser.email, currentUser.displayName);
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          {/* We render diffrent component based on the path */}
          <Route exact path="/" render={() => <Welcome model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/signup" render={() => <Signup model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/explore" render={() => <Explore model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/friendflow" render={() => <FriendFlow model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/profile" render={() => <Profile model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/otherProfile" render={() => <OtherProfile model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/chatroom" render={() => <Chat model={modelInstance} currentUser={this.state.currentUser}/>}/>

        </header>
      </div>
    );
  }
}

export default App;
