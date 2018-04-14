import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import DishDetails from './DishDetails/DishDetails';
import Overview from "./Overview/Overview";
import PrintOut from "./PrintOut/PrintOut";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app)

  });

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <div className="App-content">
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
          <Route path="/dishdetails/:value" render={(props) => <DishDetails model={modelInstance} id={props.match.params.value}/>}/>
          <Route path="/overview" render={() => <Overview model={modelInstance}/>}/>
          <Route path="/printout" render={() => <PrintOut model={modelInstance}/>}/>
        </div>

      </div>
    );
  }
}

export default App;
