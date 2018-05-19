import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Flow from '../Flow/Flow';

class Explore extends Component {
  render() {
    return (
      <div className="SelectProfile">
        <Navbar model={this.props.model}/>
        <Flow model={this.props.model}/>
      </div>
    );
  }
}

export default Explore;
