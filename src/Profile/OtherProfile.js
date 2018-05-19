import React, { Component } from 'react';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class OtherProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      keys: [],
      profile_pic: null,
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

    var userId = this.props.model.getProfileUser();

    modelInstance.createApp()
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + userId).once('value', snapshot => {
        this.setState({profileUser: snapshot.val()})
      })
      firebase.database().ref('/images/' + userId + '/image').once('value', snapshot => {
        this.setState({
          profile_pic: snapshot.val(),
          status: 'LOADED'
        });
      })
      var flow_videos = [];
      firebase.database().ref('/shares/' + userId + '/videos').once('value', snapshot => {
        if (snapshot.val() === null) {
          this.emptySharesList();
        }
        else {
          var key = Object.keys(snapshot.val());
          if (key !== undefined) {
            key.map((key) =>
            firebase.database().ref('/shares/' + userId + '/videos/' + key).once('value', videos => {
              flow_videos.unshift(videos.val());
              this.setState({profile_videos: flow_videos});
            })
          );
        }
      }
    })
    var videoTexts = [];
    firebase.database().ref('/shares/' + userId + '/texts').once('value', snapshot => {
      if (snapshot.val() !== null) {
        var key = Object.keys(snapshot.val());
        if (key !== undefined) {
          key.map((key) =>
          firebase.database().ref('/shares/' + userId + '/texts/' + key).once('value', snapshot => {
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
    firebase.database().ref('/users/' + key + '/id').once('value', id => {
      allUsers.push(id.val());
      allUsersId.push(key);
      this.setState({
        users: allUsers,
        keys: allUsersId});
      })
    )
  })
  firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
    this.setState({currentUser: snapshot.val()})
  })
})
}

shareVideo(video) {
  if (this.state.profileUser !== null) {
    modelInstance.shareVideo(video, this.props.profileuserId);
  }
}

startFollow(userid, followid) {
  if (userid === followid) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <p>Sorry, you can not follow yourself.</p>
            <button onClick={onClose}>Ok</button>
          </div>
        )
      }
    })
  }
  else {
    modelInstance.follow(userid, followid);
    window.location = "friendflow";
  }

}

stopFollow(userid, followid) {
  if (userid === followid) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <p>Sorry, you can not stop following yourself.</p>
            <button onClick={onClose}>Ok</button>
          </div>
        )
      }
    })
  }
  else {
    modelInstance.stopFollow(userid, followid);
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
    video.id = "modalVideo";
    position.appendChild(video);
  }

  emptySharesList() {
    var position = document.getElementById("profileFlow");
    if (position === null) {
      window.location = "explore";
    }
    var col = document.createElement("div");
    col.className = "col-md-1";
    position.appendChild(col);

    var text = document.createElement("p");
    text.className = "emptyResText";
    var textNode = document.createTextNode("No shares yet.");
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

    var profileUser = this.state.profileUser;

    if (profileUser !== undefined) {
      var username = profileUser.email;
      username = username.substring(0,username.indexOf("@"));
      username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
    }

    return (
      <div className="otherProfile">
        <NavBar />
        {loadingIndicator}
        <div className="col-md-2">
        </div>

        <div className="col-md-10">
          <div className="row" id="profileNamePictureArea">

            <div className="col-md-6">
              <h3 id="profileName"> {username}</h3>
              <div id="followButtons">
                <button className="followButton exploreSmallYoutubeButton" id="follow" onClick={ () => this.startFollow(this.state.currentUser.id, this.state.profileUser.id)}>Follow</button>
                <button className="exploreSmallYoutubeButton" id="follow" onClick={() => this.stopFollow(this.state.currentUser.id, this.state.profileUser.id)}>Stop Following</button>
              </div>
            </div>

            <div className="ProfilePictureArea col-md-5">
              <img id="profilePicture" src={this.state.profile_pic} alt="profilePicture" />
            </div>



          </div>
        </div>
        <div className="col-md-1"></div>
        <div  className="col-md-10">

          <div id="profileFlow">
            {
              this.state.profile_videos.map((link, i) => {

                var frame =
                <div>
                  <div className="youtubePost">
                    <div className="youtubePostHead row">
                      <img className="col-md-6 profilePictureSmall" src={this.state.profile_pic} alt="profilePictureSmall" />
                      <h2 className="col-md-6">{username}<p></p><p className="postText">{this.state.texts[i]}</p></h2>
                    </div>

                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                      <iframe className='profileVideo col-md-12' width= "840" height="472.5" key={'video' + i} title={'video' + i} src={link} frameBorder="0" allowFullScreen >
                      </iframe>
                      <div className="col-md-12" id="youtubePostButton">
                        <button className="shareButtonProfile " index={i} data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}>Share on uflow</button>
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
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => modelInstance.shareVideo(this.state.currentVideo, this.state.profileUser.id, this.state.currentText)}>Share this on Uflow</button>
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

export default OtherProfile;
