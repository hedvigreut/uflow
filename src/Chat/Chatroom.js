import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      users: [],
      keys: [],
      pictures: [],
      message : [],
      storedMessages : [],
      currentText: '',
      texts: [],
    };

    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    this.props.model.addObserver(this);
    //this.paintVideos();


    modelInstance.createApp();

    //Set current user
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
      // Fetch usernames, id:s
      var usernames = [];
      var userIds = [];
      var userPictures = [];
      firebase.database().ref('/users/').once('value', snapshot => {
        var key = Object.keys(snapshot.val());
        userIds = key;
        key.map((key) =>
        firebase.database().ref('/users/' + key + '/username').once('value', username => {
          usernames.push(username.val());
          this.setState({
            users: usernames,
            keys: userIds});
          })
        )
        //Fetch messages
        console.log(userIds)
        var storedMessages = [];
        this.state.keys.map((id) =>
        firebase.database().ref('/messages/' + id + '/text').once('value', snapshot => {
          if (snapshot.val() !== null) {
            var key = Object.keys(snapshot.val());
            key.map((key) => {
              firebase.database().ref('/messages/' + id + '/text/' + key).once('value', snapshot => {
                storedMessages.push(snapshot.val());
                this.setState({
                  storedMessages: storedMessages
                })
              })
            })
          }

        })
      )
      //Fetch profile pictures

      /*key.map((key) =>
      firebase.database().ref('/users/' + key + '/profile_pic').once('value', profile_pic => {
      userPictures.unshift(profile_pic.val());
      this.setState({pictures: userPictures});

      })
      )*/
    })
  })

}

componentDidUpdate() {
}

handleMessage = (event)=> {
  this.state.message = event.target.value;
}

getMessages(){

}

submitMessage(e) {
  e.preventDefault();
  //console.log(this.state.currentUser);
  modelInstance.message(this.state.currentUser.id, this.state.message);

}

render() {


  return (
    <div className="Chatroom">
      <h2 id="chatroomHeadline">Welcome to the U-flow chatroom!</h2>
      <h4 id="chatroomInstructions">Type a message in the box below to start chatting</h4>
      <form className="input" onSubmit={(e) => this.submitMessage(e)}>
        <input type="text" onChange={this.handleMessage}/>
        <input type="submit" value="Send"/>
      </form>
      <div id="messageArea">
        {
          this.state.storedMessages.map((message, i) => {
            var messageDiv =
            <div id={"message " + i} key={i}>
              <p className="chatMessage" key={i}>{message}</p>
            </div>
            return messageDiv;
          })
        }
      </div>
    </div>
  );
}
}

export default Chatroom;
