import React, { Component } from 'react';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';
import Chatroom from '../Chat/Chatroom';
import FriendList from '../Chat/FriendList';

class Chat extends Component {
  render() {
    return (
      <div>
        <Navbar model={this.props.model}/>
        <FriendList model={this.props.model}/>
        <Chatroom model={this.props.model}/>
      </div>
    );
  }
}

export default Chat;
