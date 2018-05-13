import React from 'react';
import ReactDOM from 'react-dom';
import './chatroom.css';
import { modelInstance } from '../data/model';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Message from './Message.js';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          users: [],
      keys: [],
      FlowVertical_pics: [],
      FlowVertical_videos: [],
      currentText: '',
      texts: [],
      following_id: [],
      usernames: [],
            chats: [{
                username: "Hedvig",
                content: <p>Hello World!</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }, {
                username: "Bea",
                content: <p>Love it! :heart:</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }, {
                username: "Hedvig",
                content: <p>Check out my Uflow</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }, {
                username: "KevHs",
                content: <p>Lorem ipsum dolor sit amet, nibh ipsum. Cum class sem inceptos incidunt sed sed. Tempus wisi enim id, arcu sed lectus aliquam, nulla vitae est bibendum molestie elit risus.</p>,
                img: "http://i.imgur.com/ARbQZix.jpg",
            }, {
                username: "Hedvig",
                content: <p>So</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }, {
                username: "Hedvig",
                content: <p>Uflow?</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }, {
                username: "Hedvig",
                content: <p>Yes!</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }, {
                username: "Bea",
                content: <p>Awesome!</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }]
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {

        this.scrollToBot();
        modelInstance.createApp();
        var firebase = require("firebase");
        firebase.auth().onAuthStateChanged(user => {
          firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
            this.setState({currentUser: snapshot.val()})
            })
          })

        
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
      var allUsers = [];
      var allUsersId = [];
      firebase.database().ref('/users/').once('value', snapshot => {
        var key = Object.keys(snapshot.val());
        //console.log(key);
        key.map((key) =>
          firebase.database().ref('/users/' + key + '/username').once('value', username => {
            allUsers.push(username.val());
            //console.log(allUsers);
            allUsersId.push(key)
            //console.log(allUsersId)
            this.setState({
              users: allUsers,
              keys: allUsersId});
          })
        )
      })
      var following = [];
      firebase.database().ref('/follow/' + user.uid + '/following').once('value', people => {
        console.log(people.val())
        if (people.val() !== null) {
          var key = Object.keys(people.val());
          if (key !== undefined) {
            key.map((key) =>
            firebase.database().ref('/follow/' + user.uid + '/following/' + key).once('value', person => {
              console.log(person.val())
              following.push(person.val());
              this.setState({following_id: following})
              var flow_usernames = [];
              var flow_profile_pics = [];
                this.state.following_id.map((id) =>
                  firebase.database().ref('/shares/' + id + '/videos').once('value', snapshot => {
                    if (snapshot.val() !== null) {
                    var keyTwo = Object.keys(snapshot.val());
                    console.log(keyTwo)
                    if (keyTwo !== undefined) {
                      keyTwo.map((keyTwo) =>
                        firebase.database().ref('/shares/' + id + '/videos/' + keyTwo).once('value', videos => {
                          firebase.database().ref('/users/' + id + '/profile_pic').once('value', profile_pic => {
                            flow_profile_pics.unshift(profile_pic.val());
                            this.setState({FlowVertical_pics: flow_profile_pics});
                          })
                        })
                      )
                    }
                  }
                  })
                )   
            })
          )
          }
        }
      })
    })

    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();

        this.setState({
            chats: this.state.chats.concat([{
                username: "Hedvig",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }


    render() {
        //const username = "Hedvig";
        const { chats } = this.state;

          var currentUser = this.state.currentUser; 

        if (currentUser !== undefined) {
      //console.log(currentUser)
      var username = currentUser.email;
      username = username.substring(0,username.indexOf("@"));
      username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
      var ID = currentUser.id;
    }
    //console.log(this.state.allPictures);

    //console.log(this.state.keys);

    // chatFriends = 
    // <div className="resUsers">
    // <div  className="row resUserArea" onClick={this.navigateToUser}>
    // <Link to="/otherProfile">
    // <img id={this.state.allUsersId} className="resUserPicture" src={this.state.allPictures} alt="profilePicture"></img>
    // <h4  className="resUsername">{this.state.allUsers}</h4>
    // </Link>
    // </div>
    // </div>
    //console.log(users);

 
    //}



        return (
          <div className="Chat">
            <div className="chatroom row">
            <div className="ChatFriends row">
            <div className="resUsers row">
        {/*
          {
            this.state.users.map((id, i) => {
              var friends =
        }
      
        <div id={this.state.following_id[i]} className="row resUserArea chatFriendArea" onClick={this.navigateToUser}>
          <Link to="/otherProfile">
            <img id={this.state.following_id[i]} className="resUserPicture chatFriend" src={this.state.FlowVertical_pics[i]} alt="profilePicture"></img>
            <h5 id={this.state.following_id[i]} className="resUsername">{this.state.users[i]}</h5>
          </Link>
        </div>
      
      return friends;
    })
          }*/}
          </div>
          </div>
                <h3>Chatting with Sabina</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
          </div>
        );
    }
}

export default Chatroom;