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
      usernames: []
    };
    this.modalVideo = this.modalVideo.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
}

handleChangeDescription(event) {
  this.setState({currentText: event.target.value});
}

  componentDidMount() {

    /*this.props.model.getVideos().then(video => {
      this.setState({
        status: 'LOADED',
        resultyt: video,

      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })*/
    modelInstance.createApp()
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
                this.state.following_id.map((id) =>
                  firebase.database().ref('/shares/' + id + '/videos').once('value', snapshot => {
                    if (snapshot.val() !== null) {
                    var keyTwo = Object.keys(snapshot.val());
                    console.log(keyTwo)
                    if (keyTwo !== undefined) {
                      keyTwo.map((keyTwo) =>
                        firebase.database().ref('/shares/' + id + '/videos/' + keyTwo).once('value', videos => {
                          flow_videos.unshift(videos.val());
                          console.log(videos.val())
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

                this.state.following_id.map((id) =>
                  firebase.database().ref('/shares/' + id + '/texts').once('value', snapshot => {
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
    var src = this.state.profile_videos[index];
    video.src = src;
    this.setState({
      currentVideo: src})
    //video.className = "col-md-7";
    video.id = "modalVideo";
    position.appendChild(video);
  }

  render() {
    var currentUser = this.state.currentUser;

    if (currentUser !== undefined) {
      //console.log(currentUser)
      var username = currentUser.email;
      username = username.substring(0,username.indexOf("@"));
      username = username.replace(/[^a-z0-9]+|\s+/gmi, "");
      var ID = currentUser.id;
    }

    return (
      <div className="FlowVertical">
        <NavBar />

        <div className="col-md-1">
        </div>
        <div className="col-md-10">
          <div id="FlowVerticalFlow">
            {
              this.state.FlowVertical_videos.map((link, i) => {

                var frame =
                <div>
                  <br></br>
                <div className="youtubePost">
                <div className="friendFlowArea">
                  <div className="youtubePostHead row">
                    <img id="profilePictureSmall" className="col-md-6" src={this.state.FlowVertical_pics[i]} alt="FlowVerticalPictureSmall" />
                    <h2 className="col-md-6">{this.state.usernames[i]}<p></p><p className="postText">{this.state.texts[i]}</p></h2>
                  </div>

                  <div className="col-md-1"></div>
                  <div className="col-md-10 youtubePostVideo">
                    <iframe className='FlowVerticalVideo col-md-12' width= "840" height="472.5" key={'video' + i} src={link} frameBorder="0" allowFullScreen >
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
