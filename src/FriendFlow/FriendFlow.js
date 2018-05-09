import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import FlowVertical from '../FlowVertical/FlowVertical';

class FriendFlow extends Component {
  render() {
    return (
      <div className="FriendFlow">
        {/* We pass the model as property to the Sidebar component */}
        <Navbar model={this.props.model}/>
        <FlowVertical model={this.props.model}/>
      </div>
    );
  }
}

export default FriendFlow;
