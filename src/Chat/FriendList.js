import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';

class FriendList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      keys: [],
      FriendList_pic: null,
      FriendList_videos: [],
      currentText: '',
      texts: []
    };
  }


  componentDidMount() {
}


  render() {


    return (
      <div className="FriendList">
        <h1>HEEEEj</h1>
        </div>
      );
    }
  }

  export default FriendList;
