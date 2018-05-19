import React, {Component} from 'react';
import { modelInstance } from '../data/model';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Flow extends Component {

  constructor(props){
    super(props);

    this.state = {
      resultyt: [],
      currentText: '',
      allObjects: [],
      allUsers: [],
      allUsersId: [],
      allPictures: [],
      status: 'INITIAL'
    };

    this.modalVideo = this.modalVideo.bind(this);

    this.navigateToUser = this.navigateToUser.bind(this);

    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  handleChangeDescription(event) {
    this.setState({currentText: event.target.value});
  }

  componentDidMount() {
    this.props.model.addObserver(this);
    this.paintVideos();
    modelInstance.createApp();
    var firebase = require("firebase");
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
        this.setState({currentUser: snapshot.val()})
      })
    })
  }


  componentWillUnmount() {
    this.props.model.removeObserver(this);

  }

  update() {
    this.setState({
      filter : this.props.model.getFilter()
    })
    this.paintVideos();
    this.paintUsers();

  }

  paintVideos() {
    this.setState({status: 'INITIAL'})
    this.props.model.getVideos(this.props.model.getFilter()).then(video => {
      var videoList = [];
      video.map((link, i) => {
        var undef = link.indexOf("undefined");
        if (undef === -1) {
          videoList.push(link);
        }
        return video;
      })
      this.setState({
        resultyt: videoList,
        status: 'LOADED'
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  paintUsers() {
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
      firebase.database().ref('/images/' + key + '/image').once('value', pic => {
        allPictures.push(pic.val());
        this.setState({allPictures: allPictures});
      })
    )
  })
})
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
  var src = this.state.resultyt[index];
  video.src = src;
  this.setState({currentVideo: src})
  //video.className = "col-md-7";
  video.id = "modalVideo";
  position.appendChild(video);
}

navigateToUser(event) {
  console.log(event.target.id);
  this.props.model.setProfileUser(event.target.id);
}

replaceThumbnail(link, i) {
  var iframe = document.getElementById("iframeImg" + i);
  iframe.innerHTML = '<iframe className="row" width="270px" height"150px" src="' + link + '" frameBorder="0" allowFullScreen></iframe>';
}


render() {

  var username = [];
  var userId = [];
  var profilePicture = [];

  this.state.allUsers.map((id, i) => {
    if (modelInstance.getFilter()) {
      var filter = modelInstance.getFilter();
      var undef = id.indexOf(filter);
      if (undef !== -1) {
        username.push(this.state.allUsers[i]);
        userId.push(this.state.allUsersId[i]);
        profilePicture.push(this.state.allPictures[i]);
      }
    }
    return true;
  })

  var resUsers = [];

  if (username.length > 0) {
    resUsers.push(
      <div className="resUsers" key="resUsers">
        <h3 className="resUsersText">Results found for <b>users</b></h3>
      </div>
    );
    username.map((name, i) => {
      resUsers.push(
        <div id={userId[i]} key={i} className="row youtubePostHead" onClick={this.navigateToUser}>
          <Link to="/otherProfile">
            <div className="col-md-3"></div>
            <img id={userId[i]} className="col-md-6 profilePictureSmall pushRight" src={profilePicture[i]} alt="profilePicture"></img>
            <h3 id={userId[i]} className="resUsername">{name}</h3>
          </Link>
        </div>
      )
      return true;
    })
  }

  var topVideo = [];
  if (this.state.resultyt.length > 0) {
    topVideo =
    <div>
      <iframe className="exploreChosenYoutube" id="promotedVideo" src={this.state.resultyt[0]} title="promotedVideo" frameBorder="0" allowFullScreen></iframe>
      <input className="row exploreSmallYoutubeButton" type="button" id="sharePromotedVideo" index={0} value="Share on Uflow" data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}></input>
    </div>
  } else {
    topVideo =
    <div>
      <h4 className="resUsersText">No results found.</h4>
    </div>
  };

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
    <div className="Explore">
      {loadingIndicator}
      {resUsers}
      <h3 id="exploreHeadline">Start Exploring by searching for a video or a user in the search box above!</h3>
      <div className="col-md-1"></div>
      <div className="promotedArea col-md-10">
        {topVideo}
      </div>

      {
        this.state.resultyt.map((link, i) => {
          var imgLink = link.split("embed/");
          var image = "https://img.youtube.com/vi/" + imgLink[1] + "/sddefault.jpg";
          var frame =
          <div key={i} className="exploreSmallYoutubeArea col-md-2">
            <div id={"iframeImg" + i} className="relativeDiv">
              <img id= {"exploreSmallYoutube " + i} onClick={() => this.replaceThumbnail(link, i)} src={image} width="270px" height="155px" frameBorder="0" alt="thumbnail">
              </img>
              <p className="img__description" onClick={() => this.replaceThumbnail(link, i)}>PLAY</p>
            </div>
            <input className="exploreSmallYoutubeButton" type="button" id="shareSingleVideo" index={i} value="Share on U-flow" data-toggle="modal" data-target="#shareModal" onClick={this.modalVideo}></input>
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

        <div className="col-md-3">
        </div>

        <div className="exploreYoutubeArea col-md-8">
          {this.frame}
        </div>
      </div>

    </div>)

  }
}


export default Flow;
