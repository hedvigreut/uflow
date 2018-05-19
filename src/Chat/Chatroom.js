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
      storedMessages : []
    };

    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    this.props.model.addObserver(this);
      //this.paintVideos();

    var allUsernames= [];
    var allUsersId = [];
    var allPictures = [];
    var allObjects = [];

    modelInstance.createApp();
    //Store objects, usernames and id:s
    firebase.auth().onAuthStateChanged(user => {
      //Store objects, usernames and id:s
      firebase.database().ref('/users/').once('value', snapshot => {
        var key = Object.keys(snapshot.val());
        allObjects.push(key);
        this.setState({allObjects: snapshot.val()})
        allObjects.push(snapshot.val());
        key.map((key) =>
          firebase.database().ref('/users/' + key + '/username').once('value', user => {
            allUsersId.push(key);
            allUsernames.push(user.val());
            this.setState({
              allUsersId: allUsersId,
              allUsers: allUsernames
            })
          })
        )
      })
      //Store profile pictures
      firebase.database().ref('/users/').once('value', snapshot => {
        var key = Object.keys(snapshot.val());
        key.map((key) =>
          firebase.database().ref('/users/' + key + '/profile_pic').once('value', pic => {
            allPictures.push(pic.val());
            this.setState({allPictures: allPictures})
          })
          )
      })
    })









      modelInstance.createApp();
      firebase.auth().onAuthStateChanged(user => {
        firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
        //console.log(Object.keys(snapshot.val());
        firebase.database().ref('/messages/' + user.uid + '/text').once('value', people => {
          console.log(people.val());
          if (people.val() !== null) {
            // if (key !== undefined) {
            //   key.map((key) =>
            //     firebase.database().ref('/follow/' + user.uid + '/following/' + key).once('value', person => {
            //       // this.state.following_id.map((id) =>
            //       //   firebase.database().ref('/shares/' + id + '/texts').once('value', snapshot => {
            //       //     // if (snapshot.val() !== null) {
            //       //     //   //var keyTwo = Object.keys(snapshot.val());
            //       //     //   // if (keyTwo !== undefined) {
            //       //     //   //   keyTwo.map((keyTwo) =>
            //       //     //   //     firebase.database().ref('/shares/' + id  + '/texts/' + keyTwo).once('value', shareTexts => {
            //       //     //   //       flow_texts.unshift(shareTexts.val());
            //       //     //   //       this.setState({texts: flow_texts});
            //       //     //   //     })
            //       //     //   //     )
            //       //     //   // }
            //       //     // }
            //       //   })
            //       //   )

            //     })
            //     )
            // }
          }
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
      //e.preventDefault();
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