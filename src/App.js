import React, { Component } from 'react';
import firebase from 'firebase';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel';
import Explore from "./Explore/Explore";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";
import Signup from "./Signup/Signup";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'U-flow',
      currentUser: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      currentUser
        ? this.setState(() => ({ currentUser }))
        : this.setState(() => ({ currentUser: null }));
    });
  }

  render() {

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAGocayAMdpzxz17dLWbfxb6v_2IGqLPbw",
        currentDomain: "uflow-b640f.firebaseapp.com",
        databaseURL: "https://uflow-b640f.firebaseio.com",
        projectId: "uflow-b640f",
        storageBucket: "uflow-b640f.appspot.com",
        messagingSenderId: "889611883337"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }


    return (
      <div className="App">
        <header className="App-header">
          {/*<h1 className="App-title">{this.state.title}</h1>*/}

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" render={() => <Welcome model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/signup" render={() => <Signup model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/explore" render={() => <Explore model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/profile" render={() => <Profile model={modelInstance} currentUser={this.state.currentUser}/>}/>
          <Route path="/edit" render={() => <EditProfile model={modelInstance} currentUser={this.state.currentUser}/>}/>

        </header>
      </div>
    );
  }
}

export default App;
