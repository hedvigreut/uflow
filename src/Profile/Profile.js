import React, { Component } from 'react';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FileUpload from './FileUpload';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      keys: [],
      profile_videos: [],
      currentText: '',
      texts: [],
      status: 'INITIAL'
    };
    this.modalVideo = this.modalVideo.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  handleChangeDescription(event) {
    this.setState({currentText: event.target.value});
  }

  componentDidMount() {
    modelInstance.getProfileUser();
    modelInstance.createApp()
    firebase.auth().onAuthStateChanged(user => {
      modelInstance.setCurrentUser(user.uid);
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
      firebase.database().ref('/images/' + user.uid + '/image').once('value', snapshot => {
          this.setState({
            profile_pic: snapshot.val(),
            status: 'LOADED'
          });
      })
      var flow_videos = [];
      firebase.database().ref('/shares/' + user.uid + '/videos').once('value', snapshot => {
        if (snapshot.val() === null) {
          this.emptySharesList();
        }
        else {
          var key = Object.keys(snapshot.val());
          if (key !== undefined) {
            key.map((key) =>
            firebase.database().ref('/shares/' + user.uid + '/videos/' + key).once('value', videos => {
              flow_videos.unshift(videos.val());
              this.setState({profile_videos: flow_videos});
            })
          );
        }
      }
    })
    var videoTexts = [];
    firebase.database().ref('/shares/' + user.uid + '/texts').once('value', snapshot => {
      if (snapshot.val() !== null) {
        var key = Object.keys(snapshot.val());
        if (key !== undefined) {
          key.map((key) =>
          firebase.database().ref('/shares/' + user.uid + '/texts/' + key).once('value', snapshot => {
            videoTexts.unshift(snapshot.val());
            this.setState({texts: videoTexts});
          })
        );
      }
    }
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
  var src = this.state.profile_videos[index];
  video.src = src;
  this.setState({
    currentVideo: src})
    //video.className = "col-md-7";
    video.id = "modalVideo";
    position.appendChild(video);
  }

  emptySharesList() {
    var position = document.getElementById("profileFlow");
    var col = document.createElement("div");
    col.className = "col-md-1";
    position.appendChild(col);

    var text = document.createElement("p");
    text.className = "emptyResText";
    var textNode = document.createTextNode("You have not shared any videos yet. Go to Explore and search for a video you want to share!");
    text.appendChild(textNode);
    position.appendChild(text);
  }

  removeShare(id, link, text) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>Do you want to delete this share?</p>
            <button onClick={onClose}>No</button>
            <button onClick={() => {
                modelInstance.removeShare(id, link, text);
                onClose()
              }}>Yes</button>
            </div>
          )
        }
      })
    };

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

      var currentUser = this.state.currentUser;

      if (currentUser !== undefined) {
        var username = currentUser.email;
        username = username.substring(0,username.indexOf("@"));
        username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
      }


      return (
        <div className="Profile">
          <NavBar />
          {loadingIndicator}
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <div className="row" id="profileNamePictureArea">
              <div className="col-md-6">
                <h3 id="profileName"> {username}
                </h3>
                <FileUpload><p className="changeProfilePic">Change profile picture</p></FileUpload>
                <p className="changeProfilePicUndertext">Drag an image to the box or click on it</p>
              </div>

              <div className="ProfilePictureArea col-md-5">
                <img id="profilePicture" src={this.state.profile_pic} alt="profilePicture" />
                <br></br>
              </div>

              </div>
            </div>
            <div className="col-md-1"></div>
            <div  className="col-md-10">

              <div id="profileFlow">
                {
                  this.state.profile_videos.map((link, i) => {

                    var frame =
                    <div key={i}>
                      <div className="youtubePost">
                        <div className="youtubePostHead row">
                          <img className="col-md-6 profilePictureSmall" src={this.state.profile_pic} alt="profilePictureSmall" />
                          <h2 className="col-md-6">{username}<p></p><p className="postText">{this.state.texts[i]}</p></h2>
                        </div>
                        <button className="removeShareButton" onClick={() => this.removeShare(this.state.currentUser.id, link, this.state.texts[i])}>X</button>
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                          <iframe className='profileVideo col-md-12' width= "840" height="472.5" key={'video' + i} title={'video' + i} src={link} frameBorder="0" allowFullScreen >
                          </iframe>
                          <div className="col-md-12" id="youtubePostButton">
                            <button className="shareButtonProfile" index={i} data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}>Share on uflow</button>
                          </div>
                        </div>
                      </div>
                      <br></br>
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

    export default Profile;
