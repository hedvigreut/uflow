import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';

class FlowVertical extends Component {

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
      status: 'INITIAL',
    };
    this.modalVideo = this.modalVideo.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.navigateToUser = this.navigateToUser.bind(this);
}

handleChangeDescription(event) {
  this.setState({currentText: event.target.value});
}

  componentDidMount() {

    modelInstance.createApp()
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
      var allUsers = [];
      var allUsersId = [];
      firebase.database().ref('/users/').once('value', snapshot => {
        var key = Object.keys(snapshot.val());
        key.map((key) =>
          firebase.database().ref('/users/' + key + '/username').once('value', username => {
            allUsers.push(username.val());
            allUsersId.push(key)
            this.setState({
              users: allUsers,
              keys: allUsersId});
          })
        )
      })
      var following = [];
      firebase.database().ref('/follow/' + user.uid + '/following').once('value', people => {
        if (people.val() === null) {
          this.emptyFollowList();
          this.setState({status: 'LOADED'})
        }
        else {
          var key = Object.keys(people.val());
          if (key !== undefined) {
            key.map((key) =>
            firebase.database().ref('/follow/' + user.uid + '/following/' + key).once('value', person => {
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
                    if (keyTwo !== undefined) {
                      keyTwo.map((keyTwo) =>
                        firebase.database().ref('/shares/' + id + '/videos/' + keyTwo).once('value', videos => {
                          flow_id_navigate.unshift(id);
                          this.setState({navigate_id: flow_id_navigate})
                          flow_videos.unshift(videos.val());
                          this.setState({FlowVertical_videos: flow_videos});
                          firebase.database().ref('/users/' + id + '/username').once('value', usernames => {
                            flow_usernames.unshift(usernames.val());
                            this.setState({usernames: flow_usernames});
                          })
                          firebase.database().ref('/images/' + id + '/image').once('value', snapshot => {
                              flow_profile_pics.unshift(snapshot.val());
                              this.setState({
                                FlowVertical_pics: flow_profile_pics
                              });
                          })
                        })
                      )
                    }
                  }
                  })
                )

                this.state.following_id.map((id) =>
                  firebase.database().ref('/shares/' + id + '/texts').once('value', snapshot => {
                    this.setState({status: 'LOADED'});
                    if (snapshot.val() !== null) {
                    var keyTwo = Object.keys(snapshot.val());
                    if (keyTwo !== undefined) {
                      keyTwo.map((keyTwo) =>
                        firebase.database().ref('/shares/' + id  + '/texts/' + keyTwo).once('value', shareTexts => {
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

  }


  shareVideo(video) {
    if (this.state.currentUser !== null) {
      modelInstance.shareVideo(video, this.props.currentUser.uid);
    }
  }

  modalVideo(event) {
    var position = document.getElementById("shareVideoArea");
    if(position.firstChild){
      position.firstChild.remove();
    }
    var inputField = document.getElementById("modalDescriptionBoxShare");
    if(inputField.value){
     inputField.value = [];
    }
    var video = document.createElement("iframe");
    var index = event.target.attributes.getNamedItem("index").value;
    var src = this.state.FlowVertical_videos[index];
    video.src = src;
    this.setState({
      currentVideo: src})
    video.id = "modalVideo";
    position.appendChild(video);
  }

  navigateToUser(event) {
    this.props.model.setProfileUser(event.target.id);
  }

  emptyFollowList() {
    var position = document.getElementById("FlowVerticalFlow");
    var col = document.createElement("div");
    col.className = "col-md-1";
    position.appendChild(col);

    var text = document.createElement("p");
    text.className = "emptyResText";
    var textNode = document.createTextNode("You are not following any U-flow users yet. Find users by searching for them in Explore!");
    text.appendChild(textNode);
    position.appendChild(text);
  }

  render() {

    let loadingIndicator = null;

    switch (this.state.status) {
      case 'INITIAL':
      loadingIndicator = <div className="loaderIcon">Data is loading...</div>
      break;
      case 'LOADED':
      loadingIndicator = ""
      break;
      default:
      loadingIndicator = <b>Failed to load data, please try again</b>
      break;
    }

    return (
      <div className="FlowVertical">
        <NavBar />
        {loadingIndicator}

        <div className="col-md-1">
        </div>
        <div className="col-md-10">
          <div id="FlowVerticalFlow">
            {
              this.state.FlowVertical_videos.map((link, i) => {

                var frame =
                <div key={i}>
                  <br></br>
                <div className="youtubePost">
                <div className="friendFlowArea">
                  <div className="youtubePostHead row">
                    <img className="col-md-6 profilePictureSmall" src={this.state.FlowVertical_pics[i]} alt="FlowVerticalPictureSmall" />
                    <Link to="/otherProfile" className="clickableUsername"><h2 className="col-md-6" id={this.state.navigate_id[i]} onClick={this.navigateToUser}>{this.state.usernames[i]}<p></p><p className="postText">{this.state.texts[i]}</p></h2></Link>
                  </div>

                  <div className="col-md-1"></div>
                  <div className="col-md-10 youtubePostVideo">
                    <iframe className='FlowVerticalVideo col-md-12' width= "840" height="472.5" key={'video' + i} title={'video' + i} src={link} frameBorder="0" allowFullScreen >
                    </iframe>
                    <div className="col-md-12">
                    <button className="shareButtonProfile" index={i} data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}>Share on uflow</button>
                    </div>
                  </div>
                </div>
                <br></br>
                </div>
                </div>
                return frame;
              })
            }
            <div>
              <div id="shareModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
                      <h4 className="modal-title" id="myModalLabel">Share video</h4>
                    </div>
                    <div className="modal-body">
                      <div className="col-md-1">
                      </div>
                      <div id="shareVideoArea">
                      </div>
                      <div className="col-md-1">
                      </div>
                      <h5 id="modalDescription">Description</h5>
                      <div className="col-md-1">
                      </div>
                      <textarea className="modalDescriptionBox" id="modalDescriptionBoxShare" placeholder="Write a description for this video" onChange={this.handleChangeDescription}></textarea>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => modelInstance.shareVideo(this.state.currentVideo, this.state.currentUser.id, this.state.currentText)}>Share this on Uflow</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
}

export default FlowVertical;
