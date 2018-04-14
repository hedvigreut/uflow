import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import Explore from "./Explore/Explore";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'U-flow',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<h1 className="App-title">{this.state.title}</h1>*/}

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/explore" render={() => <Explore model={modelInstance}/>}/>
          <Route path="/profile" render={() => <Profile model={modelInstance}/>}/>
          <Route path="/edit" render={() => <EditProfile model={modelInstance}/>}/>

        </header>
      </div>
    );
  }
}

export default App;
