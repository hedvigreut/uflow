import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import FlowVertical from '../FlowVertical/FlowVertical';

class FriendFlow extends Component {
  render() {
    return (
      <div className="FriendFlow">
        <Navbar model={this.props.model}/>
        <FlowVertical model={this.props.model}/>
      </div>
    );
  }
}

export default FriendFlow;
