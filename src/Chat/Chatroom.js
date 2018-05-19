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
      message : [],
      storedMessages : [],
      users: [],
      keys: [],
      FlowVertical_pics: [],
      FlowVertical_videos: [],
      currentText: '',
      texts: [],
      following_id: [],
      usernames: []
    };

    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    this.props.model.addObserver(this);
      //this.paintVideos();

    modelInstance.createApp();
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
              var flow_videos = [];
              var flow_texts = [];
              var flow_usernames = [];
              var flow_profile_pics = [];
              var flow_id_navigate = [];
                this.state.following_id.map((id) =>
                  firebase.database().ref('/shares/' + id + '/videos').once('value', snapshot => {
                    if (snapshot.val() !== null) {
                    var keyTwo = Object.keys(snapshot.val());
                    console.log(keyTwo)
                    if (keyTwo !== undefined) {
                      keyTwo.map((keyTwo) =>
                        firebase.database().ref('/shares/' + id + '/videos/' + keyTwo).once('value', videos => {
                          flow_id_navigate.unshift(id);
                          this.setState({navigate_id: flow_id_navigate})
                          flow_videos.unshift(videos.val());
                          //console.log(videos.val())
                          this.setState({FlowVertical_videos: flow_videos});
                          firebase.database().ref('/users/' + id + '/username').once('value', usernames => {
                            flow_usernames.unshift(usernames.val());
                            this.setState({usernames: flow_usernames});
                          })
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

                this.state.users.map((id) =>
                  firebase.database().ref('/messages/' + id + '/text').once('value', snapshot => {
                    console.log("hej");
                    console.log(id);
                    //console.log(Object.keys(snapshot.val()));
                    if (snapshot.val() !== null) {
                    var keyTwo = Object.keys(snapshot.val());
                    console.log("hallå");
                    console.log(keyTwo);
                    if (keyTwo !== undefined) {
                      keyTwo.map((keyTwo) =>
                        firebase.database().ref('/shares/' + id  + '/texts/' + keyTwo).once('value', shareTexts => {
                          console.log(shareTexts.val());
                          flow_texts.unshift(shareTexts.val());
                          this.setState({texts: flow_texts});
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




console.log(this.state.texts);






    //   var allUsernames= [];
    //   var allUsersId = [];
    //   var allPictures = [];
    //   var allObjects = [];

    //   modelInstance.createApp();
    // //Store objects, usernames and id:s
    // firebase.auth().onAuthStateChanged(user => {
    //   //Store objects, usernames and id:s
    //   firebase.database().ref('/users/').once('value', snapshot => {
    //     var key = Object.keys(snapshot.val());
    //     allObjects.push(key);
    //     this.setState({allObjects: snapshot.val()})
    //     allObjects.push(snapshot.val());
    //     key.map((key) =>
    //       firebase.database().ref('/users/' + key + '/username').once('value', user => {
    //         allUsersId.push(key);
    //         allUsernames.push(user.val());
    //         this.setState({
    //           allUsersId: allUsersId,
    //           allUsers: allUsernames
    //         })
    //       })
    //       )
    //   })
    //   //Store profile pictures
    //   firebase.database().ref('/users/').once('value', snapshot => {
    //     var key = Object.keys(snapshot.val());
    //     key.map((key) =>
    //       firebase.database().ref('/users/' + key + '/profile_pic').once('value', pic => {
    //         allPictures.push(pic.val());
    //         console.log(key);
    //         this.setState({allPictures: allPictures})
    //       })
    //       )
    //   })

    //   var messageTexts = [];
    //   firebase.database().ref('/messages/').once('value', message => {
    //     console.log("HAJ"); 
    //     console.log(message.val());
    //     //var key = Object.keys(message.val());
    //     if(message.val() != null){
    //       var key = Object.keys(message.val());
    //       //messageTexts.push(message.val());
    //       console.log("HEJ");
    //       console.log(messageTexts);
    //       this.setState({storedMessages: messageTexts})
    //       key.map((key) =>
    //         firebase.database().ref('/users/' + key + '/profile_pic').once('value', pic => {
    //           allPictures.push(pic.val());
    //           console.log(key);
    //           this.setState({allPictures: allPictures})
    //         })
    //         )
    //     }
    //   })

    // })









    // modelInstance.createApp();
    // firebase.auth().onAuthStateChanged(user => {
    //   firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
    //     this.setState({currentUser: snapshot.val()})
    //   })
    //     //console.log(Object.keys(snapshot.val());
    //     var messageTexts = [];
    //     firebase.database().ref('/messages/').once('value', people => {
    //       console.log(people.val());
    //       messageTexts.unshift(people.val());
    //       //console.log(messageTexts);
    //       if (people.val() !== null) {

    //         // if (key !== undefined) {
    //         //   key.map((key) =>
    //         //     firebase.database().ref('/follow/' + user.uid + '/following/' + key).once('value', person => {
    //         //       // this.state.following_id.map((id) =>
    //         //       //   firebase.database().ref('/shares/' + id + '/texts').once('value', snapshot => {
    //         //       //     // if (snapshot.val() !== null) {
    //         //       //     //   //var keyTwo = Object.keys(snapshot.val());
    //         //       //     //   // if (keyTwo !== undefined) {
    //         //       //     //   //   keyTwo.map((keyTwo) =>
    //         //       //     //   //     firebase.database().ref('/shares/' + id  + '/texts/' + keyTwo).once('value', shareTexts => {
    //         //       //     //   //       flow_texts.unshift(shareTexts.val());
    //         //       //     //   //       this.setState({texts: flow_texts});
    //         //       //     //   //     })
    //         //       //     //   //     )
    //         //       //     //   // }
    //         //       //     // }
    //         //       //   })
    //         //       //   )

    //         //     })
    //         //     )
    //         // }
    //       }
    //     })
    //   })

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
        <div className="chatroom">
        <h1>Messages</h1>
        <form className="input" onSubmit={(e) => this.submitMessage(e)}>
        <input type="text" onChange={this.handleMessage}/>
        <input type="submit" value="Send"/>
        </form>
        </div>
        );
    }
  }

  export default Chatroom;