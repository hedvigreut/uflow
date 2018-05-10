import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import { modelInstance } from '../data/model';
import firebase from 'firebase';

class OtherProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      keys: [],
      profile_pic: null,
      profile_videos: [],
      currentText: '',
      texts: []
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
        //console.log(userId);
        this.setState({profileUser: snapshot.val()})
      })
      var flow_videos = [];
      firebase.database().ref('/shares/' + userId + '/videos').once('value', snapshot => {
        //console.log(snapshot.val())
        if (snapshot.val() !== null) {
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
        //console.log(snapshot.val())
        if (snapshot.val() !== null) {
          var key = Object.keys(snapshot.val());
          if (key !== undefined) {
            key.map((key) =>
              firebase.database().ref('/shares/' + userId + '/texts/' + key).once('value', snapshot => {
                videoTexts.unshift(snapshot.val());
                //console.log(snapshot.val())
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
        //console.log(key);
        key.map((key) =>
        firebase.database().ref('/users/' + key + '/id').once('value', id => {
          allUsers.push(id.val());
          //console.log(allUsers);
          allUsersId.push(key);
          //console.log(allUsersId);
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

  render() {

    var profileUser = this.state.profileUser;
    //var profileUser = this.props.model.getProfileUser;

    if (profileUser !== undefined) {
      //console.log(profileUser)
      var profile_pic = profileUser.profile_pic;
      var username = profileUser.email;
      username = username.substring(0,username.indexOf("@"));
      username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
      var ID = profileUser.id;
    }

    return (
      <div className="otherProfile">
        <NavBar />

        <div className="col-md-2">
        </div>

        <div className="col-md-10">
          <div className="row" id="profileNamePictureArea">
           
            <div className="col-md-6">
              <h3 id="profileName"> {username}</h3>
              <div id="followButtons">
                  <button className="followButton exploreSmallYoutubeButton" id="follow" onClick={ () => modelInstance.follow(this.state.currentUser.id, this.state.profileUser.id)}>Follow</button>
                  <button className="exploreSmallYoutubeButton" id="follow" onClick={() => modelInstance.stopFollow(this.state.currentUser.id, this.state.profileUser.id)}>Stop Following</button>
                </div>
            </div>

            <div className="ProfilePictureArea col-md-5">
              <img id="profilePicture" src={profile_pic} alt="profilePicture" />
            </div>
                
            

          </div>

          <div className="col-md-2">
          </div>
          <div id="profileFlow">
            {
              this.state.profile_videos.reverse().map((link, i) => {

                var frame =
                <div>
                <div className="youtubePost">
                  <div className="youtubePostHead row">
                    <img id="profilePictureSmall" className="col-md-6" src={profile_pic} alt="profilePictureSmall" />
                    <h2 className="col-md-6">{username}<p></p><p className="postText">{this.state.texts[i]}</p></h2>
                  </div>
                  <button className="removeShareButton" onClick={() => modelInstance.removeShare(this.state.profileUser.id, link, this.state.texts[i])}>X</button>

                  <div className="col-md-1"></div>
                  <div className="col-md-10">
                    <iframe className='profileVideo col-md-12' width= "840" height="472.5" key={'video' + i} src={link} frameBorder="0" allowFullScreen >
                    </iframe>
                    <div className="col-md-12">
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
              <div id="shareModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
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
