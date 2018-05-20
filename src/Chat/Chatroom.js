import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';
import plusIcon from "../Chat/plus-icon.png";

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
        console.log(this.state.currentUser.id)
        var storedMessages = [];
        this.state.keys.map((id) =>
        firebase.database().ref('/messages/' + id + '/message').once('value', snapshot => {
          if (snapshot.val() !== null) {
            var key = Object.keys(snapshot.val());
            key.map((key) => {
              firebase.database().ref('/messages/' + id + '/message/' + key + '/text').once('value', text => {
                if (text.val() !== null) {
                  firebase.database().ref('/messages/' + id + '/message/' + key + '/timestamp').once('value', timestamp => {
                    firebase.database().ref('/users/' + id + '/username').once('value', username => {
                      firebase.database().ref('/images/' + id + '/image').once('value', image => {
                        if (id === this.state.currentUser.id) {
                          storedMessages.push([text.val(), timestamp.val(), image.val(), username.val(), 'current']);
                          storedMessages.sort(this.comparator);
                          this.setState({
                            storedMessages: storedMessages
                          })
                        }
                        else {
                          storedMessages.push([text.val(), timestamp.val(), image.val(), username.val()]);
                          storedMessages.sort(this.comparator);
                          this.setState({
                            storedMessages: storedMessages
                          })
                        }
                      })
                    })
                  })
                }
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

comparator(a, b) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
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
      <div className="footer">
        <form className="input row" onSubmit={(e) => this.submitMessage(e)}>
          <img className="plusIcon" src={plusIcon}></img>
          <input type="text" className="inputMessage" placeholder="Type message here"onChange={this.handleMessage}/>
          <button type="submit" className="submitButton" value="Send">Send</button>
        </form>
      </div>
      <div id="messageArea">
        {
          this.state.storedMessages.map((message, i) => {
            var messageDiv =
            <div id={"message " + i} key={i}>
              <div className={"chatPostHead row " + message[4]}>
                <img className="profilePictureChat col-xs-1" src={message[2]} alt="profilePictureChat" />
                <h4 className="usernameText col-xs-3" key={"usernameText " + i} >{message[3]}<p></p><p className="postText">{this.state.storedMessages[i][0]}</p></h4>
              </div>
            </div>
            return messageDiv;
          })
        }
      </div>
      <div id="spaceDiv"></div>
    </div>
  );
}
}

export default Chatroom;
