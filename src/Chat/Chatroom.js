import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';
import plusIcon from "../Chat/plus-icon.png";
import FileUploadChat from './FileUploadChat';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      users: [],
      keys: [],
      pictures: [],
      message : null,
      storedMessages : [],
      currentText: '',
      texts: [],
      status: 'INITIAL'
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
        modelInstance.setCurrentUser(user.uid);
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
                    firebase.database().ref('/messages/' + id + '/message/' + key + '/image').once('value', chatImg => {
                    firebase.database().ref('/users/' + id + '/username').once('value', username => {
                      firebase.database().ref('/images/' + id + '/image').once('value', image => {
                        if (id === this.state.currentUser.id) {
                          storedMessages.push([text.val(), timestamp.val(), image.val(), username.val(), chatImg.val(), 'current']);
                          storedMessages.sort(this.comparator);
                          this.setState({
                            storedMessages: storedMessages,
                            status: 'LOADED'
                          })
                          setTimeout(this.scrollToBottom, 2000);
                        }
                        else {
                          storedMessages.push([text.val(), timestamp.val(), image.val(), username.val(), chatImg.val()]);
                          storedMessages.sort(this.comparator);
                          this.setState({
                            storedMessages: storedMessages,
                            status: 'LOADED'
                          })
                          setTimeout(this.scrollToBottom, 2000);
                        }
                        })
                      })
                    })
                  })
                }
              })
            })
          }

        })
      )
    })

  })
}

scrollToBottom = () => {
  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
}

scrollToBottomUpdate = () => {
  this.messagesEnd.scrollIntoView();
}

update() {

  var storedMessages = [];
  this.state.keys.map((id) =>
  firebase.database().ref('/messages/' + id + '/message').once('value', snapshot => {
    if (snapshot.val() !== null) {
      var key = Object.keys(snapshot.val());
      key.map((key) => {
        firebase.database().ref('/messages/' + id + '/message/' + key + '/text').once('value', text => {
          if (text.val() !== null) {
            firebase.database().ref('/messages/' + id + '/message/' + key + '/timestamp').once('value', timestamp => {
              firebase.database().ref('/messages/' + id + '/message/' + key + '/image').once('value', chatImg => {
                console.log(chatImg.val())
              firebase.database().ref('/users/' + id + '/username').once('value', username => {
                firebase.database().ref('/images/' + id + '/image').once('value', image => {
                  if (id === this.state.currentUser.id) {
                    storedMessages.push([text.val(), timestamp.val(), image.val(), username.val(), chatImg.val(), 'current']);
                    storedMessages.sort(this.comparator);
                    this.setState({
                      storedMessages: storedMessages,
                      status: 'LOADED'
                    })
                    this.scrollToBottomUpdate();
                  }
                  else {
                    storedMessages.push([text.val(), timestamp.val(), image.val(), username.val(), chatImg.val()]);
                    storedMessages.sort(this.comparator);
                    this.setState({
                      storedMessages: storedMessages,
                      status: 'LOADED'
                    })
                    this.scrollToBottomUpdate();
                  }
                  })
                })
              })
            })
          }
        })
      })
    }

  })
)
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
  console.log(this.state.message);
  var chatUrl = modelInstance.getChatUrl();
  console.log(chatUrl);
  modelInstance.message(this.state.currentUser.id, this.state.message, chatUrl);
  var inputBox = document.getElementsByClassName("inputMessage");
  inputBox[0].value= "";
}

render() {

  let loadingIndicator = null;

  switch (this.state.status) {
    case 'INITIAL':
    loadingIndicator = <div className="loaderIcon">Data is loading...</div>
    break;
    case 'LOADED':
    loadingIndicator = "",
    this.scrollToBottom();
    break;
    default:
    loadingIndicator = <b>Failed to load data, please try again</b>
    break;
  }

  return (
    <div className="Chatroom">
      <NavBar />
      {loadingIndicator}
      <h2 id="chatroomHeadline">Welcome to the U-flow chatroom!</h2>

          <form className="footer" onSubmit={(e) => this.submitMessage(e)}>
            <FileUploadChat><img className="plusIcon" src={plusIcon}></img></FileUploadChat>
            <input type="text" className="inputMessage" placeholder="Type message here" onChange={this.handleMessage}/>
            <button type="submit" className="submitButton right" value="Send">Send</button>
          </form>

      <div id="messageArea">
        {
          this.state.storedMessages.map((message, i) => {
            if (message[4] === null) {
              var messageDiv =
              <div id={"message " + i} key={i}>
                <div className={"chatPostHead row " + message[5]}>
                  <img className="profilePictureChat col-xs-1" src={message[2]} alt="profilePictureChat" />
                  <h5 className={"usernameTextChat col-xs-2 text" + message[5]} key={"usernameText " + i} >{message[3]}<p></p><p className="postTextChat">{this.state.storedMessages[i][0]}</p></h5>
                </div>
              </div>
              return messageDiv;
            } else {
              var messageDiv =
              <div id={"message " + i} key={i}>
                <div className={"chatPostHead row " + message[5]}>
                  <img className="profilePictureChat col-xs-1" src={message[2]} alt="profilePictureChat" />
                  <h5 className={"usernameTextChat col-xs-2 text" + message[5]} key={"usernameText " + i} >{message[3]}<p></p><p className="postTextChat">{this.state.storedMessages[i][0]}</p></h5>
                    <br></br>
                    <img src={message[4]} key={"img" + i} className={"row col-xs-10 chatImage " + message[5] + "ChatImg"}></img>
                </div>
              </div>
              return messageDiv;
            }
          })
        }
      </div>
      <div id="spaceDiv" style={{ float:"left", clear: "both" }}
           ref={(el) => { this.messagesEnd = el; }}>
      </div>

    </div>
  );
}
}

export default Chatroom;
